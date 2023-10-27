import { axiosInstance } from '@/apis';
import { RestaurantResponse, getRestaurantListByKeywordRequest } from '@/types/restaurant';

export const getRestaurantListByKeyword = async ({
  latitude,
  longitude,
  radius,
  keyword,
  star,
  day,
  time,
}: getRestaurantListByKeywordRequest) => {
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
