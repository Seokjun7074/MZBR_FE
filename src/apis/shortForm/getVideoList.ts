import { axiosInstance } from '@/apis';

export interface VideoListRequest {
  topLat: number;
  topLng: number;
  bottomLat: number;
  bottomLng: number;
}

export const getVideoList = async ({ topLat, topLng, bottomLat, bottomLng }: VideoListRequest) => {
  const { data } = await axiosInstance.get(`/api/b/videos`, {
    params: {
      topLat,
      topLng,
      bottomLat,
      bottomLng,
    },
  });
  // 무한스크롤 버전
  // const { data } = await axiosInstance.get(`/api/b/videos/${page}`, {
  //   params: {
  //     topLat,
  //     topLng,
  //     bottomLat,
  //     bottomLng,
  //   },
  // });

  return data;
};
