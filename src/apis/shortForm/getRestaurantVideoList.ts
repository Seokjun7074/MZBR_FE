import { axiosInstance } from '@/apis';

export const getRestaurantVideoList = async (restaurantId: string) => {
  const { data } = await axiosInstance.get(`/api/b/videos/restaurants/${restaurantId}`);
  return data;
};
