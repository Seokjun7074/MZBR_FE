import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import { ShotFormContainerWrapper } from '@/components/ShortForm/ShotFormContainer/ShotFormContainer.style';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ShortFormContainer {
  videoPath: string;
}

const ShotFormContainer = ({ videoPath }: ShortFormContainer) => {
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
        url={videoPath}
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
