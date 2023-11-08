import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

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
  const overlayRef = useRef(null);
  const rndRef = useRef(null);

  const [boxData, setBoxData] = useState({
    x: 0,
    y: 0,
    width: 'auto',
    height: '100%',
  });
  const rndStyle = {
    height: '100%',
    aspectRatio: 9 / 16,
    // border: 'solid 1px blue',
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

  const onDragStop = (data: any) => {
    // setBoxData({ ...boxData, x: data.x, y: data.y });
    if (overlayRef.current && rndRef.current) {
      const overlayRect = overlayRef.current!.getBoundingClientRect();
      const rndRect = rndRef.current!.getBoundingClientRect();

      const relativeX = rndRect.left - overlayRect.left;
      const relativeY = rndRect.top - overlayRect.top;

      console.log(videoRef.current?.videoWidth);
      console.log(videoRef.current?.videoHeight);

      // 이제 relativeX와 relativeY에는 Rnd 컴포넌트와 VideoOverlay 사이의 상대적인 좌표가 저장됩니다.
      console.log('상대적인 X 좌표:', relativeX);
      console.log('상대적인 Y 좌표:', relativeY);
    }
  };
  const onResizeStop = () => {};
  //   console.log(boxData);
  return (
    <>
      {/* <S.VideoContainer>
        <S.VideoOverlay ref={overlayRef}>
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
              x: boxData.x,
              y: boxData.y,
              width: boxData.width,
              height: boxData.height,
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
          <S.VideoOverlay ref={overlayRef}>
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
                x: boxData.x,
                y: boxData.y,
                width: boxData.width,
                height: boxData.height,
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
        </S.VideoContainer>
      )}
    </>
  );
};

export default VideoPlayer;
