import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import { ShotFormContainerWrapper } from '@/components/ShortForm/ShotFormContainer/ShotFormContainer.style';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import { VideoInfo } from '@/types/shortForm';

interface ShortFormContainer {
  videoInfo: VideoInfo;
}

const ShotFormContainer = ({ videoInfo }: ShortFormContainer) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<ReactPlayer | null>(null);
  const observerRef = useIntersectionObserver(
    () => setPlaying(true),
    () => setPlaying(false),
  );
  const handlePlay = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <ShotFormContainerWrapper ref={observerRef}>
      <ReactPlayer
        ref={videoRef}
        onClick={handlePlay}
        className="react-player"
        url={videoInfo.masterUrl}
        width="100%"
        height="100%"
        playing={playing}
        muted={true}
        controls={false}
        pip={true}
      />
    </ShotFormContainerWrapper>
  );
};

export default ShotFormContainer;
