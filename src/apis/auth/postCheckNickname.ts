import { axiosInstance } from '@/apis';

export const postCheckNickname = async (nickname: string) => {
  const { data } = await axiosInstance.post<{ duplicated: boolean }>(
    '/api/b/users/nickname/check',
    {
      nickname,
    },
  );
  return data;
};
