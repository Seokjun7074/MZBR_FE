import { useCallback, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

import { useRecoilState } from 'recoil';

import * as S from '@/pages/ReviewPage/VideoText/VideoText.style';

import { useInput } from '@/hooks/useInput';

import { reviewRequestState } from '@/store/reviewRequest';
import { preparedVideoAtom } from '@/store/video';

const VideoText = () => {
  const DUMMY_VIDEO =
    'https://mzbr-temp-video-bucket.s3.ap-northeast-2.amazonaws.com/crop/2ac6fe92-cb3c-4de7-b6bb-1d77ed25e524.mp4';
  const [reviewRequest, setReviewRequest] = useRecoilState(reviewRequestState);
  const [preparedVideo, setPreparedVideo] = useRecoilState(preparedVideoAtom);
  const rndRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { value, handleInput } = useInput('');
  const [textPosition, setTextPosition] = useState({
    x: 0,
    y: 0,
  });

  const onDragStop = () => {
    if (videoRef.current && rndRef.current) {
      const videoRect = videoRef.current.getBoundingClientRect();
      const rndRect = rndRef.current.getBoundingClientRect();
      const cropRatio = videoRect.width / videoRef.current.videoWidth;
      const cropStartX = Math.round((rndRect.x - videoRect.x + window.scrollX) / cropRatio);
      const cropStartY = Math.round((rndRect.y - videoRect.y + window.scrollY) / cropRatio);
      const croppedData = {
        x: cropStartX,
        y: cropStartY,
      };
      setTextPosition(croppedData);
    }
  };

  const addSubtitle = useCallback(() => {
    const newSubtitle = [
      ...reviewRequest.subtitles,
      {
        text: value, //자막의 텍스트
        startDuration: 0, //자막의 시작 시간
        endDuration: videoRef.current?.duration!, //자막의 종료 시간
        x: textPosition.x,
        y: textPosition.y,
        scale: 1.0, //자막의 크기. 20폰트를 기본으로 함
        rotation: 0.0, // 자막의 회전 정도
        color: 16777215, //자막의 RGB값을 int 형태로 변환한 값
        zIndex: 1,
      },
    ];
    setReviewRequest({ ...reviewRequest, subtitles: newSubtitle });
  }, []);

  return (
    <S.VideoTextWrapper>
      <S.VideoContainer>
        <S.VideoTextOverlay>
          <S.VideoTag ref={videoRef} src={DUMMY_VIDEO} crossOrigin="anonymous" autoPlay controls />
          {/* <S.VideoTag ref={videoRef} src={preparedVideo[0].videoUrl} /> */}
          <Rnd
            bounds={'parent'}
            default={{
              x: 0,
              y: 0,
              width: 'auto',
              height: 'auto',
            }}
            enableResizing={false}
            onDragStop={onDragStop}
          >
            <div ref={rndRef} style={{ width: '100%', height: '100%' }}>
              {value}
            </div>
          </Rnd>
        </S.VideoTextOverlay>
      </S.VideoContainer>
      <S.TextInput type="text" placeholder="자막을 추가해주세요" onChange={handleInput} />
      <S.VideoTextButton onClick={addSubtitle}>자막 추가하기</S.VideoTextButton>
    </S.VideoTextWrapper>
  );
};

export default VideoText;
