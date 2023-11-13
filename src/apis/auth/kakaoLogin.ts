import { axiosInstance } from '@/apis';

export const kakaoLogin = async (code: string) => {
  const { data } = await axiosInstance.get<LoginResponse>(`/api/b/oauth2/code&code=${code}`);
  return data;
};
