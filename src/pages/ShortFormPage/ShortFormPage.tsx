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
      <ReactPlayer
        ref={videoRef}
        onClick={handlePlay}
        className="zzzzzzz"
        url="https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8"
        width="100%" // 플레이어 크기 (가로)
        height="calc(100% - 2rem)" // 플레이어 크기 (세로)
        playing={playing} // 자동 재생 on
        muted={true} // 자동 재생 on
        controls={false} // 플레이어 컨트롤 노출 여부
        pip={true} // pip 모드 설정 여부
        onEnded={() => {
          alert('ZZ');
        }}
        onProgress={(e) => {
          console.log(e);
        }}
      />
    </S.ShortFormPageWrapper>
  );
};

export default ShortFormPage;
