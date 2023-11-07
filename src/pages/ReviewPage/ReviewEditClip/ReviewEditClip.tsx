import { fetchFile } from '@ffmpeg/ffmpeg';

import { useEffect, useRef, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import * as S from '@/pages/ReviewPage/ReviewEditClip/ReviewEditClip.style';

import Slider from '@/components/Review/Slider/Slider';
import VideoPlayer from '@/components/Review/VideoPlayer/VideoPlayer';

import { useFFmpeg } from '@/hooks/useFFmpeg';

import { endAtom, startAtom, videoAtom } from '@/store/video';

const ReviewEditClip = () => {
  const videoState = useRecoilValue(videoAtom);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ffmpegRef } = useFFmpeg();

  const [startTime, setStartTime] = useRecoilState(startAtom);
  const [endTime, setEndTime] = useRecoilState(endAtom);
  const [duration, setDuration] = useState(0);
  const [currentTimeCode, setCurrentTimeCode] = useState(0);

  const cutVideo = async (url: string) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;
    ffmpeg.FS('writeFile', `myVideo.mp4`, await fetchFile(url));
    try {
      await ffmpeg.run(
        '-ss',
        String(startTime),
        '-accurate_seek',
        '-i',
        `myVideo.mp4`,
        '-to',
        String(endTime - startTime),
        '-codec',
        'copy',
        'newVideo.mp4',
      );
    } catch (e) {
      console.log('[동영상 자르기 오류]', e);
    }
    const result = ffmpeg.FS('readFile', 'newVideo.mp4');
    const blob = new Blob([result.buffer], { type: 'video/mp4' });
    const file = new File([blob], 'newVideo.mp4', { type: 'video/mp4', lastModified: Date.now() });
    const resultPreview = URL.createObjectURL(blob);
    return resultPreview;
  };

  const handelCutVideo = async () => {
    const res = await cutVideo(videoState.url);
    console.log(res);
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
      <div style={{ width: '100%', padding: '0 2rem' }}>
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
