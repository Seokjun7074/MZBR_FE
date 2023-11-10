import { axiosInstance } from '@/apis';

export const postUploadComplete = async (videoName: string) => {
  const { data } = await axiosInstance.post(`/api/temp-video/upload/${videoName}/upload-complete`);

  return data?.url;
};
