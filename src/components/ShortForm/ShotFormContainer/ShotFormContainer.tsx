import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import * as S from '@/components/ShortForm/ShotFormContainer/ShotFormContainer.style';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import { VideoInfo } from '@/types/shortForm';

interface ShortFormContainer {
  videoInfo: VideoInfo;
}

const ShotFormContainer = ({ videoInfo }: ShortFormContainer) => {
  const [playing, setPlaying] = useState(false);
  const S3_URL = 'https://mzbr-temp-video-bucket.s3.ap-northeast-2.amazonaws.com/';
  const videoRef = useRef<ReactPlayer | null>(null);
  const observerRef = useIntersectionObserver(
    () => setPlaying(true),
    () => setPlaying(false),
  );
  const handlePlay = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <S.ShotFormContainerWrapper ref={observerRef}>
      <ReactPlayer
        ref={videoRef}
        onClick={handlePlay}
        className="react-player"
        url={`${S3_URL}${videoInfo.masterUrl}`}
        width="100%"
        height="100%"
        playing={playing}
        muted={false}
        controls={true}
        pip={true}
        loop={true}
      />
      <S.ShotFormInfoContainer>
        <S.ShotFormInfoHeader>
          <h2>🍴 {videoInfo.storeName}</h2>
          <span>★ {videoInfo.star}</span>
        </S.ShotFormInfoHeader>
        <S.ShotFormInfoHeader>
          <p>✏️ {videoInfo.description}</p>
        </S.ShotFormInfoHeader>
      </S.ShotFormInfoContainer>
    </S.ShotFormContainerWrapper>
  );
};

export default ShotFormContainer;
