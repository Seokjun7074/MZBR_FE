import { axiosInstance } from '@/apis';

export const postSignup = async (nickname: string) => {
  const { data } = await axiosInstance.post('/signup', { nickname });
  return data;
};
