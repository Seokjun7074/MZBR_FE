import { useState } from 'react';

export const useDragText = (
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  rndRef: React.MutableRefObject<HTMLDivElement | null>,
) => {
  const [textPosition, setTextPosition] = useState({
    x: 0,
    y: 0,
  });

  const onDragStop = () => {
    if (videoRef.current && rndRef.current) {
      const videoRect = videoRef.current.getBoundingClientRect();
      const rndRect = rndRef.current.getBoundingClientRect();
      const cropRatio = videoRect.width / videoRef.current.videoWidth;
      const cropStartX = Math.round((rndRect.x - videoRect.x + window.scrollX) / cropRatio);
      const cropStartY = Math.round((rndRect.y - videoRect.y + window.scrollY) / cropRatio);

      const reaX = 720 * (cropStartX / videoRef.current.videoWidth);
      const reaY = 1280 * (cropStartY / videoRef.current.videoHeight);
      const croppedData = {
        x: reaX,
        y: reaY,
      };
      setTextPosition({ ...croppedData });
    }
  };

  return {
    textPosition,
    onDragStop,
  };
};
