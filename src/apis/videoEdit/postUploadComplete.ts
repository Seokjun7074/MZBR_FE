import { axiosInstance } from '@/apis';

export const postUploadComplete = async (videoName: string, videoUuid: string) => {
  const { data } = await axiosInstance.post(`/api/v/video/temp/upload-complete`, {
    videoName,
    videoUuid,
  });

  return data?.url;
};
