import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import { endAtom, startAtom } from '@/store/video';

export const useVideoControl = (
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  setCurrentTimeCode: React.Dispatch<React.SetStateAction<number>>,
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const startTime = useRecoilValue(startAtom);
  const endTime = useRecoilValue(endAtom);

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

  return { isPlaying, handlePlayVideo, handelSkipBack, handelSkipForward, handleOverEndTime };
};
