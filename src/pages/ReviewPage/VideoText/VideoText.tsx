import { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import * as S from '@/pages/ReviewPage/VideoText/VideoText.style';

import { useInput } from '@/hooks/useInput';
import { useDragText } from '@/hooks/videoEdit/useDragText';

import { PATH } from '@/constants/path';

import { reviewRequestState } from '@/store/reviewRequest';
import { previewAtom } from '@/store/video';

const VideoText = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const [reviewRequest, setReviewRequest] = useRecoilState(reviewRequestState);
  const [videoPreview, setVideoPreview] = useRecoilState(previewAtom);

  const rndRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { value, handleInput } = useInput('');
  const { textPosition, onDragStop } = useDragText(videoRef, rndRef);

  const addSubtitle = () => {
    const newSubtitle = [
      ...reviewRequest.subtitles,
      {
        text: value, //자막의 텍스트
        startDuration: 0, //자막의 시작 시간
        endDuration: videoRef.current?.duration!, //자막의 종료 시간
        x: textPosition.x,
        y: textPosition.y,
        scale: 5.6,
        rotation: 0.0, // 자막의 회전 정도
        color: 8421504, //자막의 RGB값을 int 형태로 변환한 값
        zIndex: 1,
      },
    ];
    setReviewRequest({ ...reviewRequest, subtitles: newSubtitle });
    navigateToUpload();
  };

  const navigateToUpload = () => {
    navigate(PATH.VIDEO_UPLOADING(storeId!));
  };

  return (
    <S.VideoTextWrapper>
      <S.VideoContainer>
        <S.VideoTextOverlay>
          {videoPreview && (
            <S.VideoTag ref={videoRef} src={videoPreview} controls crossOrigin="anonymous" />
          )}
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
            <div
              ref={rndRef}
              style={{
                width: '100%',
                height: '100%',
                color: 'gray',
                fontWeight: 'bold',
                fontSize: '20pt',
              }}
            >
              {value}
            </div>
          </Rnd>
        </S.VideoTextOverlay>
      </S.VideoContainer>
      <S.TextInput type="text" placeholder="자막을 추가해주세요" onChange={handleInput} />
      <S.VideoTextButton onClick={addSubtitle}>자막 추가완료</S.VideoTextButton>
    </S.VideoTextWrapper>
  );
};

export default VideoText;
