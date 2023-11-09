import { axiosInstance } from '@/apis';

export interface VideoListRequest {
  toplat: number;
  toplong: number;
  bottomlat: number;
  bottomlong: number;
}

export const getVideoList = async (
  { toplat, toplong, bottomlat, bottomlong }: VideoListRequest,
  page: number,
) => {
  const { data } = await axiosInstance.get(`/videos/${page}`, {
    params: {
      toplat,
      toplong,
      bottomlat,
      bottomlong,
    },
  });

  return data;
};
