export const useDragCropVideo = (
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  rndRef: React.MutableRefObject<HTMLDivElement | null>,
  setCroppedVideo: React.Dispatch<React.SetStateAction<{}>>,
) => {
  const onDragStop = () => {
    if (videoRef.current && rndRef.current) {
      const videoRect = videoRef.current.getBoundingClientRect();
      const rndRect = rndRef.current.getBoundingClientRect();
      const cropRatio = videoRect.width / videoRef.current.videoWidth;
      const cropStartX = Math.round((rndRect.x - videoRect.x + window.scrollX) / cropRatio);
      const cropStartY = Math.round((rndRect.y - videoRect.y + window.scrollY) / cropRatio);

      const cropWidth = Math.round(rndRect.width / cropRatio);
      const cropHeight = Math.round(rndRect.height / cropRatio);

      const croppedData = {
        x: cropStartX,
        y: cropStartY,
        width: cropWidth,
        height: cropHeight,
      };
      console.log(croppedData);
      setCroppedVideo(croppedData);
    }
  };

  return { onDragStop };
};
