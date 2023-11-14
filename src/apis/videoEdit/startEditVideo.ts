import { axiosInstance } from '@/apis';

export const startEditVideo = async (videoUuid: string) => {
  const response = await axiosInstance.post(`/api/v/video/${videoUuid}/process-start`);
  return response;
};
