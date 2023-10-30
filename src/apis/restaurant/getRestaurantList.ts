import { axiosInstance } from '@/apis';
import { RestaurantListRequest, RestaurantResponse } from '@/types/restaurant';

export const getRestaurantList = async ({ latitude, longitude, radius }: RestaurantListRequest) => {
  const { data } = await axiosInstance.get<RestaurantResponse>('/restaurants', {
    params: {
      latitude,
      longitude,
      radius,
    },
  });

  return data;
};
