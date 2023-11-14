import { axiosInstance } from '@/apis';

export interface VideoListRequest {
  topLat: number;
  topLong: number;
  bottomLat: number;
  bottomLong: number;
}

export const getVideoList = async (
  { topLat, topLong, bottomLat, bottomLong }: VideoListRequest,
  page: number,
) => {
  const { data } = await axiosInstance.get(`/videos/${page}`, {
    params: {
      topLat,
      topLong,
      bottomLat,
      bottomLong,
    },
  });

  return data;
};
