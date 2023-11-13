import { axiosInstance } from '@/apis';
import { RestaurantListByKeywordRequest, RestaurantResponse } from '@/types/restaurant';

export const getRestaurantListByKeyword = async ({
  toplat,
  toplng,
  bottomlat,
  bottomlng,
  keyword,
  star,
  day,
  time,
}: RestaurantListByKeywordRequest) => {
  const { data } = await axiosInstance.get<RestaurantResponse>('/restaurants/search', {
    params: {
      toplat,
      toplng,
      bottomlat,
      bottomlng,
      keyword,
      star,
      day,
      time,
    },
  });
  return data;
};
