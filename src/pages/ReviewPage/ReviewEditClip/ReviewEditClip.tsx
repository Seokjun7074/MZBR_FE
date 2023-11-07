import { fetchFile } from '@ffmpeg/ffmpeg';

import { useEffect, useRef, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import * as S from '@/pages/ReviewPage/ReviewEditClip/ReviewEditClip.style';

import Slider from '@/components/Review/Slider/Slider';

import { useFFmpeg } from '@/hooks/useFFmpeg';

import { endAtom, startAtom, videoAtom } from '@/store/video';

const ReviewEditClip = () => {
  const videoState = useRecoilValue(videoAtom);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ffmpegRef } = useFFmpeg();

  const [startTime, setStartTime] = useRecoilState(startAtom);
  const [endTime, setEndTime] = useRecoilState(endAtom);
  const [duration, setDuration] = useState(0);

  const cutVideo = async (url: string) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;
    console.log(startTime, endTime);
    ffmpeg.FS('writeFile', `myVideo.mp4`, await fetchFile(url));
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
    const result = ffmpeg.FS('readFile', 'newVideo.mp4');
    const resultPreview = URL.createObjectURL(new Blob([result.buffer], { type: 'video/mp4' }));
    console.log(resultPreview);
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

      {videoState.url && (
        <S.VideoTag src={videoState.url} ref={videoRef} controls crossOrigin="use-credentials" />
      )}
      <Slider duration={duration} videoRef={videoRef} />

      <h1
        onClick={() => {
          console.log(startTime, endTime);
        }}
      >
        CHECK
      </h1>
      <button onClick={() => cutVideo(videoState.url)}>자르기</button>
    </S.ReviewEditClipWrapper>
  );
};

export default ReviewEditClip;
