import { axiosInstance } from '@/apis';

export const getAudioThumbnail = async (thumbnailFileName: string, audioFileName?: string) => {
  const { data } = await axiosInstance.post('/v/video/thumbnail-and-audio-upload-url', {
    thumbnailFileName,
    audioFileName,
  });
  return data;
};
