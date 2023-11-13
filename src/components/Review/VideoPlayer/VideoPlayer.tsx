import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import * as S from '@/components/Review/VideoPlayer/VideoPlayer.style';

import Pause from '@/assets/videoPlayer/pause.svg';
import Play from '@/assets/videoPlayer/play.svg';
import SkipBack from '@/assets/videoPlayer/skipBack.svg';
import SkipForward from '@/assets/videoPlayer/skipForward.svg';

import { croppedVideoAtom, endAtom, startAtom, videoAtom } from '@/store/video';

interface VideoPlayerProps {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  setCurrentTimeCode: React.Dispatch<React.SetStateAction<number>>;
}

const VideoPlayer = ({ videoRef, setCurrentTimeCode }: VideoPlayerProps) => {
  const videoState = useRecoilValue(videoAtom);
  const startTime = useRecoilValue(startAtom);
  const endTime = useRecoilValue(endAtom);
  const [isPlaying, setIsPlaying] = useState(false);
  const setCroppedVideo = useSetRecoilState(croppedVideoAtom);
  const rndRef = useRef<HTMLDivElement | null>(null);

  const rndStyle = {
    aspectRatio: 9 / 16,
    border: 'solid 1px blue',
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

  const onDragStop = () => {
    if (videoRef.current && rndRef.current) {
      const videoRect = videoRef.current.getBoundingClientRect();
      const rndRect = rndRef.current.getBoundingClientRect();

      const cropRatio = videoRect.width / videoRef.current.videoWidth;

      const cropStartX = Math.round((rndRect.x - videoRect.x + window.scrollX) / cropRatio);
      const cropStartY = Math.round((rndRect.y - videoRect.y + window.scrollY) / cropRatio);

      const cropWidth = Math.round(rndRect.width / cropRatio);
      const cropHeight = Math.round(rndRect.height / cropRatio);

      const croppedData = {
        x: cropStartX,
        y: cropStartY,
        width: cropWidth,
        height: cropHeight,
      };
      setCroppedVideo(croppedData);
    }
  };

  return (
    <>
      {/* <S.VideoContainer>
        <S.VideoOverlay>
          <S.VideoTag
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
            ref={videoRef}
            crossOrigin="anonymous"
            onTimeUpdate={handleOverEndTime}
            onClick={handlePlayVideo}
          />
          <Rnd
            style={rndStyle}
            bounds={'parent'}
            default={{
              x: 100,
              y: 0,
              width: 'auto',
              height: '100%',
            }}
            lockAspectRatio={true}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
          >
            <div
              ref={rndRef}
              style={{ width: '100%', height: '100%', backgroundColor: 'red' }}
            ></div>
          </Rnd>
        </S.VideoOverlay>
        <S.VideoController>
          <SkipBack style={{ cursor: 'pointer' }} onClick={handelSkipBack} />
          {isPlaying ? (
            <Pause style={{ cursor: 'pointer' }} onClick={handlePlayVideo} />
          ) : (
            <Play style={{ cursor: 'pointer' }} onClick={handlePlayVideo} />
          )}
          <SkipForward style={{ cursor: 'pointer' }} onClick={handelSkipForward} />
        </S.VideoController>
      </S.VideoContainer> */}
      {videoState.url && (
        <S.VideoContainer>
          <S.VideoOverlay>
            <S.VideoTag
              src={videoState.url}
              ref={videoRef}
              crossOrigin="use-credentials"
              onTimeUpdate={handleOverEndTime}
              onClick={handlePlayVideo}
            />
            <Rnd
              style={rndStyle}
              bounds={'parent'}
              default={{
                x: 0,
                y: 0,
                width: 'auto',
                height: '100%',
              }}
              lockAspectRatio={true}
              onDragStop={onDragStop}
              onResizeStop={onDragStop}
            >
              <div
                ref={rndRef}
                style={{ width: '100%', height: '100%', border: '1px dashed gray' }}
              ></div>
            </Rnd>
          </S.VideoOverlay>
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
