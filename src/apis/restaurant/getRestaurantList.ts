import { axiosInstance } from '@/apis';
import { RestaurantResponse, getRestaurantListRequest } from '@/types/restaurant';

export const getRestaurantList = async ({
  latitude,
  longitude,
  radius,
}: getRestaurantListRequest) => {
  const { data } = await axiosInstance.get<RestaurantResponse>('/restaurants', {
    params: {
      latitude,
      longitude,
      radius,
    },
  });

  return data;
};
