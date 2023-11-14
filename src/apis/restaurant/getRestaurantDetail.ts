import { axiosInstance } from '@/apis';
import { RestaurantDetailResponse } from '@/types/restaurant';

export const getRestaurantDetail = async (storeId: string) => {
  const { data } = await axiosInstance.get<RestaurantDetailResponse>(
    `/api/b/restaurants/${storeId}`,
  );
  return data;
};
