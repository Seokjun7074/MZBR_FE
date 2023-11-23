import { useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import * as S from '@/components/Review/VideoPlayer/VideoPlayer.style';
import Spinner from '@/components/common/Spinner/Spinner';

import { useVideoControl } from '@/hooks/videoEdit/useVideoControl';

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
  const setCroppedVideo = useSetRecoilState(croppedVideoAtom);
  const rndRef = useRef<HTMLDivElement | null>(null);
  const { isPlaying, handlePlayVideo, handelSkipBack, handelSkipForward, handleOverEndTime } =
    useVideoControl(videoRef, setCurrentTimeCode);

  const rndStyle = {
    aspectRatio: 9 / 16,
    border: 'solid 1px #F77137',
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
      console.log(croppedData);
      setCroppedVideo(croppedData);
    }
  };
  useEffect(() => {
    videoRef.current?.addEventListener('loadedmetadata', onDragStop);
    return () => videoRef.current?.removeEventListener('loadedmetadata', onDragStop);
  }, [videoState]);

  if (!videoState.url) {
    return <Spinner />;
  }

  return (
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
          <div ref={rndRef} style={{ width: '100%', height: '100%' }} />
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
  );
};

export default VideoPlayer;
