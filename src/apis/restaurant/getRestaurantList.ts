import { axiosInstance } from '@/apis';
import { RestaurantResponse } from '@/types/restaurant';

export interface getRestaurantListRequest {
  latitude: number;
  longitude: number;
  radius: number;
}

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
