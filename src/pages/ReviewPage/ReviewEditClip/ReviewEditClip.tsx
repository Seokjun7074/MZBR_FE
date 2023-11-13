import { fetchFile } from '@ffmpeg/ffmpeg';
import { v4 } from 'uuid';

import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';

import * as S from '@/pages/ReviewPage/ReviewEditClip/ReviewEditClip.style';

import Slider from '@/components/Review/Slider/Slider';
import VideoPlayer from '@/components/Review/VideoPlayer/VideoPlayer';

import { useFFmpeg } from '@/hooks/useFFmpeg';

import { getPresignedUrl } from '@/apis/videoEdit/getPresignedUrl';
import { postUploadComplete } from '@/apis/videoEdit/postUploadComplete';
import { uploadVideo } from '@/apis/videoEdit/uploadVideo';

import { PATH } from '@/constants/path';

import { croppedVideoAtom, endAtom, preparedVideoAtom, startAtom, videoAtom } from '@/store/video';

const ReviewEditClip = () => {
  const { restaurant_id } = useParams<{ restaurant_id: string }>();
  const location = useLocation();
  const videoState = useRecoilValue(videoAtom);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ffmpegRef } = useFFmpeg();

  const startTime = useRecoilValue(startAtom);
  const [endTime, setEndTime] = useRecoilState(endAtom);
  const [preparedVideo, setPreparedVideo] = useRecoilState(preparedVideoAtom);
  const [duration, setDuration] = useState(0);
  const [currentTimeCode, setCurrentTimeCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const croppedVideo = useRecoilValue(croppedVideoAtom);
  const navigate = useNavigate();

  const cutVideo = async (url: string) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;
    const uuid = v4();
    const outputFileName = `${uuid}.mp4`;
    ffmpeg.FS('writeFile', `inputVideo.mp4`, await fetchFile(url));
    try {
      await ffmpeg.run(
        '-ss',
        String(startTime),
        '-accurate_seek',
        '-i',
        `inputVideo.mp4`,
        '-to',
        String(endTime - startTime),
        '-codec',
        'copy',
        outputFileName,
      );
    } catch (e) {
      console.error('[동영상 자르기 오류]', e);
    }
    const result = ffmpeg.FS('readFile', outputFileName);
    const blob = new Blob([result.buffer], { type: 'video/mp4' });
    return { blob, outputFileName };
  };

  const handelCutVideo = async () => {
    setIsLoading((prev) => !prev);
    const cuttedVideo = await cutVideo(videoState.url);

    const videoName = cuttedVideo!.outputFileName;
    const videoUuid = location.state.videoUuid;
    const presignedUrl = await getPresignedUrl({
      videoName,
      videoUuid,
      crop: croppedVideo, // 자른 비디오 좌표 정보
    });
    await uploadVideo(presignedUrl, cuttedVideo!.blob);

    const videoUrl = await postUploadComplete(cuttedVideo!.outputFileName, videoUuid);
    console.log(videoUrl);
    setPreparedVideo([...preparedVideo, { videoName, videoUrl }]);
    setIsLoading((prev) => !prev);
    navigate(PATH.VIDEO_PREVIEW(restaurant_id!));
  };

  useEffect(() => {
    const video = videoRef.current;
    video?.addEventListener('loadedmetadata', () => {
      setEndTime(video.duration);
      setDuration(video.duration);
    });
  }, [videoState]);

  return (
    <>
      {isLoading ? (
        <h1>편집중...</h1>
      ) : (
        <S.ReviewEditClipWrapper>
          <S.EditHeader>영상의 구간을 선택해주세요!</S.EditHeader>
          <VideoPlayer videoRef={videoRef} setCurrentTimeCode={setCurrentTimeCode} />
          <div style={{ width: '80%', padding: '0 2rem' }}>
            <Slider
              duration={duration}
              videoRef={videoRef}
              currentTimeCode={currentTimeCode}
              setCurrentTimeCode={setCurrentTimeCode}
            />
          </div>
          <S.NextButton onClick={handelCutVideo}>자르기</S.NextButton>
        </S.ReviewEditClipWrapper>
      )}
    </>
  );
};

export default ReviewEditClip;
