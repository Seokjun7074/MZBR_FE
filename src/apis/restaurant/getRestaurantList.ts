import { axiosInstance } from '@/apis';
import { RestaurantListRequest, RestaurantResponse } from '@/types/restaurant';

export const getRestaurantList = async ({
  topLat,
  topLng,
  bottomLat,
  bottomLng,
}: RestaurantListRequest) => {
  const { data } = await axiosInstance.get<RestaurantResponse>('/api/b/restaurants', {
    params: {
      topLat,
      topLng,
      bottomLat,
      bottomLng,
    },
  });

  return data;
};
