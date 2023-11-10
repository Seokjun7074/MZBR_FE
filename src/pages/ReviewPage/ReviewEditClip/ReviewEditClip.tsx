import { fetchFile } from '@ffmpeg/ffmpeg';
import { v4 } from 'uuid';

import { useEffect, useRef, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import * as S from '@/pages/ReviewPage/ReviewEditClip/ReviewEditClip.style';

import Slider from '@/components/Review/Slider/Slider';
import VideoPlayer from '@/components/Review/VideoPlayer/VideoPlayer';

import { useFFmpeg } from '@/hooks/useFFmpeg';

import { getPresignedUrl } from '@/apis/videoEdit/getPresignedURL';
import { postUploadComplete } from '@/apis/videoEdit/postUploadComplete';
import { uploadVideo } from '@/apis/videoEdit/uploadVideo';

import { croppedVideoAtom, endAtom, preparedVideoAtom, startAtom, videoAtom } from '@/store/video';

const ReviewEditClip = () => {
  const videoState = useRecoilValue(videoAtom);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ffmpegRef } = useFFmpeg();

  const startTime = useRecoilValue(startAtom);
  const [endTime, setEndTime] = useRecoilState(endAtom);
  const [preparedVideo, setPreparedVideo] = useRecoilState(preparedVideoAtom);
  const [duration, setDuration] = useState(0);
  const [currentTimeCode, setCurrentTimeCode] = useState(0);
  const croppedVideo = useRecoilValue(croppedVideoAtom);

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
    const file = new File([blob], outputFileName, { type: 'video/mp4', lastModified: Date.now() });
    const resultPreview = URL.createObjectURL(blob);
    return { resultPreview, file, blob, outputFileName };
  };

  const handelCutVideo = async () => {
    const res = await cutVideo(videoState.url);
    const preparedRes = {
      file: res!.file,
      url: res!.resultPreview,
      blob: res!.blob,
    };
    setPreparedVideo([...preparedVideo, preparedRes]);

    const presignedUrl = await getPresignedUrl({
      videoName: res!.outputFileName,
      crop: croppedVideo,
    });
    await uploadVideo(presignedUrl, preparedRes.blob);
    const videoUrl = await postUploadComplete(res!.outputFileName);
    console.log(videoUrl);
    alert('구간 자르기 완료');
  };

  useEffect(() => {
    const video = videoRef.current;
    video?.addEventListener('loadedmetadata', () => {
      setEndTime(video.duration);
      setDuration(video.duration);
    });
  }, [videoState]);

  return (
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
  );
};

export default ReviewEditClip;
