import { axiosInstance } from '@/apis';

export const getUserInfo = async (userId: string) => {
  const { data } = await axiosInstance.get(`/api/b/users/${userId}`);
  return data;
};
