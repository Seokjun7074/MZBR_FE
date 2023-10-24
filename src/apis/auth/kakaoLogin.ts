import { axiosInstance } from '@/apis';

export const kakaoLogin = async (code: string) => {
  const { data } = await axiosInstance.get<LoginResponse>(`/login?type=KAKAO&code=${code}`);
  return data;
};
