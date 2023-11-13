import { axiosInstance } from '@/apis';
import { RestaurantListByKeywordRequest, RestaurantResponse } from '@/types/restaurant';

export const getRestaurantListByKeyword = async ({
  toplat,
  toplng,
  bottomlat,
  bottomlng,
  keyword,
  star,
}: RestaurantListByKeywordRequest) => {
  const { data } = await axiosInstance.get<RestaurantResponse>('/api/b/restaurants/search', {
    params: {
      toplat,
      toplng,
      bottomlat,
      bottomlng,
      keyword,
      star,
    },
  });
  return data;
};
