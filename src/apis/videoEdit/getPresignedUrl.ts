import { axiosInstance } from '@/apis';

interface PresignedUrlRequest {
  videoName: string;
  crop: {};
}

export const getPresignedUrl = async (request: PresignedUrlRequest) => {
  const { data } = await axiosInstance.post('/api/temp-video/upload', request);
  return data?.url;
};
