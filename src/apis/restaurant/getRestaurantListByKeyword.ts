import { axiosInstance } from '@/apis';
import { RestaurantListByKeywordRequest, RestaurantResponse } from '@/types/restaurant';

export const getRestaurantListByKeyword = async ({
  topLat,
  topLng,
  bottomLat,
  bottomLng,
  keyword,
  star,
}: RestaurantListByKeywordRequest) => {
  const { data } = await axiosInstance.get<RestaurantResponse>('/api/b/restaurants/search', {
    params: {
      topLat,
      topLng,
      bottomLat,
      bottomLng,
      keyword,
      star,
    },
  });
  return data;
};
