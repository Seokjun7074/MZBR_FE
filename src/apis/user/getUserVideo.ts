import { axiosInstance } from '@/apis';

export const getUserVideo = async (userId: string) => {
  const { data } = await axiosInstance.get(`/api/b/videos/users/${userId}`);
  return data;
};
