import { fetchFile } from '@ffmpeg/ffmpeg';

import { useEffect, useRef, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import * as S from '@/pages/ReviewPage/ReviewEditClip/ReviewEditClip.style';

import Slider from '@/components/Review/Slider/Slider';

import { useFFmpeg } from '@/hooks/useFFmpeg';

import Pause from '@/assets/videoPlayer/pause.svg';
import Play from '@/assets/videoPlayer/play.svg';
import SkipBack from '@/assets/videoPlayer/skipBack.svg';
import SkipForward from '@/assets/videoPlayer/skipForward.svg';

import { endAtom, startAtom, videoAtom } from '@/store/video';

const ReviewEditClip = () => {
  const videoState = useRecoilValue(videoAtom);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ffmpegRef } = useFFmpeg();

  const [startTime, setStartTime] = useRecoilState(startAtom);
  const [endTime, setEndTime] = useRecoilState(endAtom);
  const [duration, setDuration] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

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
    console.log(blob);
    const file = new File([blob], 'newVideo.mp4', { type: 'video/mp4', lastModified: Date.now() });
    const resultPreview = URL.createObjectURL(blob);
    return resultPreview;
  };

  const handelCutVideo = async () => {
    const res = await cutVideo(videoState.url);
    console.log(res);
  };

  const handlePlayVideo = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(!isPlaying);
      return;
    }
    videoRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  const handelSkipBack = () => {
    if (videoRef.current) videoRef.current.currentTime = startTime;
  };
  const handelSkipForward = () => {
    if (videoRef.current) videoRef.current.currentTime = endTime;
  };

  const handleOverEndTime = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.target as HTMLVideoElement;
    if (video.currentTime >= endTime) {
      handlePlayVideo();
    }
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

      {/* <S.VideoTag
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
        ref={videoRef}
        crossOrigin="anonymous"
        onTimeUpdate={handleOverEndTime}
        onLoadedData={handlePlayVideo}
        onClick={handlePlayVideo}
      /> */}
      {videoState.url && (
        <>
          <S.VideoTag
            src={videoState.url}
            ref={videoRef}
            crossOrigin="use-credentials"
            onTimeUpdate={handleOverEndTime}
            onClick={handlePlayVideo}
          />
          <S.VideoController>
            <SkipBack style={{ cursor: 'pointer' }} onClick={handelSkipBack} />
            {isPlaying ? (
              <Pause style={{ cursor: 'pointer' }} onClick={handlePlayVideo} />
            ) : (
              <Play style={{ cursor: 'pointer' }} onClick={handlePlayVideo} />
            )}
            <SkipForward style={{ cursor: 'pointer' }} onClick={handelSkipForward} />
          </S.VideoController>
        </>
      )}

      <Slider duration={duration} videoRef={videoRef} />

      <S.NextButton onClick={handelCutVideo}>자르기</S.NextButton>
    </S.ReviewEditClipWrapper>
  );
};

export default ReviewEditClip;
