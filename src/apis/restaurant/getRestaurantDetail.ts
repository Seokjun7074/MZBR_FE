import { axiosInstance } from '@/apis';
import { RestaurantDetailResponse } from '@/types/restaurant';

export const getRestaurantDetail = async (restaurantId: string) => {
  const { data } = await axiosInstance.get<RestaurantDetailResponse>(
    `/restaurants/${restaurantId}`,
  );
  return data;
};
