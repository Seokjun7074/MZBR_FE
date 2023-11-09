import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import { ShotFormContainerWrapper } from '@/components/ShortForm/ShotFormContainer/ShotFormContainer.style';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const ShotFormContainer = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<ReactPlayer | null>(null);
  const observerRef = useIntersectionObserver(
    () => setPlaying(true),
    () => setPlaying(false),
  );

  const handlePlay = () => {
    setPlaying(!playing);
  };

  return (
    <ShotFormContainerWrapper ref={observerRef}>
      <ReactPlayer
        ref={videoRef}
        onClick={handlePlay}
        className="react-player"
        url="https://joo-test-bucket-2023.s3.ap-northeast-2.amazonaws.com/encoded-video/c4730998-77c0-45d2-bb88-781e06d634fd/master.m3u8"
        width="100%"
        height="100%"
        playing={playing}
        muted={true}
        controls={true}
        pip={true}
      />
    </ShotFormContainerWrapper>
  );
};

export default ShotFormContainer;
