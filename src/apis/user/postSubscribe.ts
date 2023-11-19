import { axiosInstance } from '@/apis';

export const postSubscribe = async (userId: string) => {
  const { data } = await axiosInstance.post(`api/b/users/subscribe/${userId}`);
  return data;
};
