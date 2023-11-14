import { axiosInstance } from '@/apis';

export interface VideoListRequest {
  topLat: number;
  topLng: number;
  bottomLat: number;
  bottomLng: number;
}

export const getVideoList = async (
  { topLat, topLng, bottomLat, bottomLng }: VideoListRequest,
  page: number,
) => {
  const { data } = await axiosInstance.get(`/api/b/videos/${page}`, {
    params: {
      topLat,
      topLng,
      bottomLat,
      bottomLng,
    },
  });

  return data;
};
