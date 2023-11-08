import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import * as S from '@/pages/ShortFormPage/ShortFormPage.style';

const ShortFormPage = () => {
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<ReactPlayer | null>(null);

  const handlePlay = () => {
    setPlaying((playing) => !playing);
  };

  return (
    <S.ShortFormPageWrapper>
      <S.ShotFormContainer>
        <ReactPlayer
          style={{ borderRadius: '8px', overflow: 'hidden' }}
          ref={videoRef}
          onClick={handlePlay}
          className="zzzzzzz"
          url="https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8"
          width="100%"
          height="100%"
          playing={playing}
          muted={true}
          controls={true}
        />
      </S.ShotFormContainer>
      <S.ShotFormContainer>
        <ReactPlayer
          ref={videoRef}
          onClick={handlePlay}
          className="zzzzzzz"
          url="https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8"
          width="100%" // 플레이어 크기 (가로)
          height="100%" // 플레이어 크기 (세로)
          playing={playing} // 자동 재생 on
          muted={true} // 자동 재생 on
          controls={true} // 플레이어 컨트롤 노출 여부
          pip={true} // pip 모드 설정 여부
        />
      </S.ShotFormContainer>
    </S.ShortFormPageWrapper>
  );
};

export default ShortFormPage;
