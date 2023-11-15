import { FFmpeg, createFFmpeg } from '@ffmpeg/ffmpeg';

import { useEffect, useRef, useState } from 'react';

export const useFFmpeg = () => {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const init = async () => {
    try {
      await ffmpegRef.current!.load();
      setFfmpegLoaded(true);
    } catch (error) {
      console.log('[init FFMPEG]', error);
    }
  };

  useEffect(() => {
    ffmpegRef.current = createFFmpeg({
      log: false,
      corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
      progress: (p) => console.log(p.ratio),
    });
    init();
  }, []);

  return { ffmpegRef, ffmpegLoaded };
};
