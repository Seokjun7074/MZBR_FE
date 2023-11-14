import { axiosInstance } from '@/apis';

export const logout = async () => {
  const { data } = await axiosInstance.post('/api/b/log-out');
  return data;
};
