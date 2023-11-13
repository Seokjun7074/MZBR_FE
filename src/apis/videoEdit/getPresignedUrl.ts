import { axiosInstance } from '@/apis';

interface PresignedUrlRequest {
  videoName: string;
  videoUuid: string;
  crop: {};
}

export const getPresignedUrl = async (request: PresignedUrlRequest) => {
  const { data } = await axiosInstance.post('/api/v/video/temp/upload', request);
  return data?.url;
};
