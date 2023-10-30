import { axiosInstance } from '@/apis';
import { RestaurantListByKeywordRequest, RestaurantResponse } from '@/types/restaurant';

export const getRestaurantListByKeyword = async ({
  latitude,
  longitude,
  radius,
  keyword,
  star,
  day,
  time,
}: RestaurantListByKeywordRequest) => {
  const { data } = await axiosInstance.get<RestaurantResponse>('/restaurants/search', {
    params: {
      latitude,
      longitude,
      radius,
      keyword,
      star,
      day,
      time,
    },
  });
  return data;
};
