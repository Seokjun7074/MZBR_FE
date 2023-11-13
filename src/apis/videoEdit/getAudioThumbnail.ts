import { axiosInstance } from '@/apis';

export const getAudioThumbnail = async (thumbnailFileName: string, audioFileName?: string) => {
  const { data } = await axiosInstance.post('/videos/upload/complete', {
    thumbnailFileName,
    audioFileName,
  });
  return data;
};
