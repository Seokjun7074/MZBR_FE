import { axiosInstance } from '@/apis';

export interface VideoListRequest {
  latitude: number;
  longitude: number;
}

export const getVideoList = async ({ latitude, longitude }: VideoListRequest, page: number) => {
  const { data } = await axiosInstance.get(`/videos/${page}`, {
    params: {
      latitude,
      longitude,
    },
  });

  return data;
};
