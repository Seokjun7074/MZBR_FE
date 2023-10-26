import { axiosInstance } from '@/apis';

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
  const { data } = await axiosInstance.get('/restaurants', {
    params: {
      latitude,
      longitude,
      radius,
    },
  });

  return data;
};
