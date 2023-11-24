import { FFmpeg, createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { v4 } from 'uuid';

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

  const cutVideo = async (url: string, startTime: number, endTime: number) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;
    const uuid = v4();
    const outputFileName = `${uuid}.mp4`;
    ffmpeg.FS('writeFile', `inputVideo.mp4`, await fetchFile(url));
    try {
      await ffmpeg.run(
        '-ss',
        String(startTime),
        '-accurate_seek',
        '-i',
        `inputVideo.mp4`,
        '-to',
        String(endTime - startTime),
        '-codec',
        'copy',
        outputFileName,
      );
    } catch (e) {
      console.error('[동영상 자르기 오류]', e);
      throw new Error('[동영상 자르기 오류]');
    }
    const result = ffmpeg.FS('readFile', outputFileName);
    const blob = new Blob([result.buffer], { type: 'video/mp4' });
    return { blob, outputFileName };
  };

  const makeThumbnail = async (url: string) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;
    const thumbnailName = `${v4()}.jpeg`;

    ffmpeg.FS('writeFile', `inputVideo.mp4`, await fetchFile(url));
    try {
      await ffmpeg.run('-i', 'inputVideo.mp4', '-ss', '00:00:00', '-vframes', '1', thumbnailName);
    } catch (e) {
      console.error('[썸네일 생성 오류]', e);
    }
    const result = ffmpeg.FS('readFile', thumbnailName);
    const blob = new Blob([result.buffer], { type: 'image/jpeg' });
    return { blob, thumbnailName };
  };

  return { ffmpegRef, ffmpegLoaded, cutVideo, makeThumbnail };
};
