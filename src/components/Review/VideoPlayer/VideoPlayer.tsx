import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import * as S from '@/components/Review/VideoPlayer/VideoPlayer.style';

import Pause from '@/assets/videoPlayer/pause.svg';
import Play from '@/assets/videoPlayer/play.svg';
import SkipBack from '@/assets/videoPlayer/skipBack.svg';
import SkipForward from '@/assets/videoPlayer/skipForward.svg';

import { endAtom, startAtom, videoAtom } from '@/store/video';

interface VideoPlayerProps {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  setCurrentTimeCode: React.Dispatch<React.SetStateAction<number>>;
}

const VideoPlayer = ({ videoRef, setCurrentTimeCode }: VideoPlayerProps) => {
  const videoState = useRecoilValue(videoAtom);

  const startTime = useRecoilValue(startAtom);
  const endTime = useRecoilValue(endAtom);
  const [isPlaying, setIsPlaying] = useState(false);

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
      video.pause();
      setIsPlaying(false);
      setCurrentTimeCode(endTime);
      return;
    }
    if (video.currentTime <= startTime) {
      video.pause();
      setIsPlaying(false);
      setCurrentTimeCode(startTime);
      return;
    }
    setCurrentTimeCode(video.currentTime);
  };

  return (
    <>
      <S.VideoTag
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
        ref={videoRef}
        crossOrigin="anonymous"
        onTimeUpdate={handleOverEndTime}
        onClick={handlePlayVideo}
      />
      {videoState.url && (
        <S.VideoContainer>
          {/* <S.VideoTag
            src={videoState.url}
            ref={videoRef}
            crossOrigin="use-credentials"
            onTimeUpdate={handleOverEndTime}
            onClick={handlePlayVideo}
          /> */}
          <S.VideoController>
            <SkipBack style={{ cursor: 'pointer' }} onClick={handelSkipBack} />
            {isPlaying ? (
              <Pause style={{ cursor: 'pointer' }} onClick={handlePlayVideo} />
            ) : (
              <Play style={{ cursor: 'pointer' }} onClick={handlePlayVideo} />
            )}
            <SkipForward style={{ cursor: 'pointer' }} onClick={handelSkipForward} />
          </S.VideoController>
        </S.VideoContainer>
      )}
    </>
  );
};

export default VideoPlayer;
