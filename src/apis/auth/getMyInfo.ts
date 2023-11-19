import { axiosInstance } from '@/apis';

export const getMyInfo = async () => {
  const { data } = await axiosInstance.get('/api/b/users/me');
  return data;
};
