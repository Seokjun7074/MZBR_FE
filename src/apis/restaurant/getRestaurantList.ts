import { axiosInstance } from '@/apis';
import { RestaurantListRequest, RestaurantResponse } from '@/types/restaurant';

export const getRestaurantList = async ({
  toplat,
  toplng,
  bottomlat,
  bottomlng,
}: RestaurantListRequest) => {
  const { data } = await axiosInstance.get<RestaurantResponse>('/api/b/restaurants', {
    params: {
      toplat,
      toplng,
      bottomlat,
      bottomlng,
    },
  });

  return data;
};
