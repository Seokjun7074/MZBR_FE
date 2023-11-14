import { axiosInstance } from '@/apis';

export const postSignup = async (nickname: string) => {
  const { data } = await axiosInstance.post('/api/b/join', { nickname });
  return data;
};
