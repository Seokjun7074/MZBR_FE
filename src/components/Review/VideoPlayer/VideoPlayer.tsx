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
  // const overlayRef = useRef<HTMLDivElement | null>(null);
  const rndRef = useRef<HTMLDivElement | null>(null);

  const rndStyle = {
    height: '100%',
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

  const onDragStop = (data: any) => {
    if (videoRef.current && rndRef.current) {
      const videoRect = videoRef.current.getBoundingClientRect();
      const rndRect = rndRef.current.getBoundingClientRect();

      // 크롭 데이터에서 비디오 요소의 상대적인 좌표를 계산
      const cropStartX = Math.round(rndRect.x - videoRect.x + window.scrollX);
      const cropStartY = Math.round(rndRect.y - videoRect.y + window.scrollY);

      const cropRatio = videoRect.width / videoRef.current.videoWidth;

      const cropWidth = Math.round(rndRect.width / cropRatio);
      const cropHeight = Math.round(rndRect.height / cropRatio);

      // 원본 비디오 크기 대비 크롭 크기의 비율을 계산하여 백분율로 표현

      console.log(`크롭 상대 시작점: (${cropStartX}, ${cropStartY})`);
      console.log(`크롭 크기: (${cropWidth}, ${cropHeight})`);

      ////////

      // const relativeX = rndRect.left - videoRect.left;
      // const relativeY = rndRect.top - videoRect.top;

      // console.log(videoRef.current?.videoWidth);
      // console.log(videoRef.current?.videoHeight);

      // // 이제 relativeX와 relativeY에는 Rnd 컴포넌트와 VideoOverlay 사이의 상대적인 좌표가 저장됩니다.
      // console.log('상대적인 X 좌표:', relativeX);
      // console.log('상대적인 Y 좌표:', relativeY);
    }
  };
  const onResizeStop = () => {};
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
