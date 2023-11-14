import { useRef } from 'react';
import { Rnd } from 'react-rnd';

import { useRecoilState } from 'recoil';

import * as S from '@/pages/ReviewPage/VideoText/VideoText.style';

import { useInput } from '@/hooks/useInput';

import { preparedVideoAtom } from '@/store/video';

const VideoText = () => {
  const DUMMY_VIDEO =
    'https://mzbr-temp-video-bucket.s3.ap-northeast-2.amazonaws.com/crop/2ac6fe92-cb3c-4de7-b6bb-1d77ed25e524.mp4';

  const [preparedVideo, setPreparedVideo] = useRecoilState(preparedVideoAtom);
  const rndRef = useRef<Rnd | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { value, handleInput } = useInput('');

  return (
    <S.VideoTextWrapper>
      <S.VideoContainer>
        <S.VideoTextOverlay>
          <S.VideoTag ref={videoRef} src={DUMMY_VIDEO} crossOrigin="anonymous" autoPlay controls />
          {/* <S.VideoTag ref={videoRef} src={preparedVideo[0].videoUrl} /> */}
          <Rnd
            ref={rndRef}
            style={{ border: '1px solid red' }}
            bounds={'parent'}
            default={{
              x: 0,
              y: 0,
              width: 'auto',
              height: 'auto',
            }}
            enableResizing={false}
          >
            {value}
          </Rnd>
        </S.VideoTextOverlay>
      </S.VideoContainer>
      <S.TextInput type="text" placeholder="자막을 추가해주세요" onChange={handleInput} />
      <S.VideoTextButton>자막 추가하기</S.VideoTextButton>
    </S.VideoTextWrapper>
  );
};

export default VideoText;
