import { fetchFile } from '@ffmpeg/ffmpeg';
import { v4 } from 'uuid';

import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import * as S from '@/pages/ReviewPage/ReviewEditClip/ReviewEditClip.style';

import Slider from '@/components/Review/Slider/Slider';
import VideoPlayer from '@/components/Review/VideoPlayer/VideoPlayer';
import Spinner from '@/components/common/Spinner/Spinner';

import { useFFmpeg } from '@/hooks/useFFmpeg';

import { getPresignedUrl } from '@/apis/videoEdit/getPresignedUrl';
import { postUploadComplete } from '@/apis/videoEdit/postUploadComplete';
import { uploadVideo } from '@/apis/videoEdit/uploadVideo';

import { PATH } from '@/constants/path';

import { reviewRequestState } from '@/store/reviewRequest';
import { croppedVideoAtom, endAtom, preparedVideoAtom, startAtom, videoAtom } from '@/store/video';

const ReviewEditClip = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ffmpegRef } = useFFmpeg();

  const [duration, setDuration] = useState(0);
  const [currentTimeCode, setCurrentTimeCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const videoState = useRecoilValue(videoAtom);
  const startTime = useRecoilValue(startAtom);
  const [endTime, setEndTime] = useRecoilState(endAtom);
  const [preparedVideo, setPreparedVideo] = useRecoilState(preparedVideoAtom);
  const [reviewRequest, setReviewRequest] = useRecoilState(reviewRequestState);

  const croppedVideo = useRecoilValue(croppedVideoAtom);
  const resetStartAtom = useResetRecoilState(startAtom);
  const resetEndAtom = useResetRecoilState(endAtom);
  const resetVideoAtom = useResetRecoilState(videoAtom);
  const resetCroppedVideoAtom = useResetRecoilState(croppedVideoAtom);

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
    // 영상 컷편집 처리
    const cuttedVideo = await cutVideo(videoState.url);
    const videoName = cuttedVideo!.outputFileName;
    const videoUuid = location.state.videoUuid;
    // S3 presignUrl 받기
    const presignedUrl = await getPresignedUrl({
      videoName,
      videoUuid,
      crop: croppedVideo,
    });
    // S3에 영상 업로드
    await uploadVideo(presignedUrl, cuttedVideo!.blob);

    // S3업로드 확인 요청
    const videoUrl = await postUploadComplete(cuttedVideo!.outputFileName, videoUuid);
    setPreparedVideo([...preparedVideo, { videoName, videoUrl }]);
    const newClip = [
      ...reviewRequest.clips,
      {
        fileName: videoName,
        volume: 1.0,
      },
    ];
    setReviewRequest({ ...reviewRequest, clips: newClip });
    resetEditdata();
    setIsLoading((prev) => !prev);
    navigate(PATH.VIDEO_PREVIEW(storeId!));
  };

  const resetEditdata = () => {
    resetStartAtom();
    resetEndAtom();
    resetVideoAtom();
    resetCroppedVideoAtom();
  };

  useEffect(() => {
    const video = videoRef.current;
    const setVideoTimeInfo = () => {
      setEndTime(video!.duration);
      setDuration(video!.duration);
    };
    video?.addEventListener('loadedmetadata', setVideoTimeInfo);

    return () => video?.removeEventListener('loadedmetadata', setVideoTimeInfo);
  }, [videoState]);

  return (
    <>
      {isLoading ? (
        <Spinner message="영상을 불러오고 있어요!" />
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
