import { axiosInstance } from '@/apis';

export const postCheckNickname = async (nickname: string) => {
  const { data } = await axiosInstance.post('/users/nickname/check', { nickname });
  return data;
};
