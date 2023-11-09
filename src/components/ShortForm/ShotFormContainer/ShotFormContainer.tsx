import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import { ShotFormContainerWrapper } from '@/components/ShortForm/ShotFormContainer/ShotFormContainer.style';

const ShotFormContainer = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<ReactPlayer | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handlePlay = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPlaying(true);
        } else {
          setPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

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
