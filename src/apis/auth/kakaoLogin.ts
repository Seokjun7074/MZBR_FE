import { axiosInstance } from '@/apis';
import { LoginResponse, SignedUserResponse } from '@/types/auth';

export const kakaoLogin = async (code: string) => {
  const { data } = await axiosInstance.get<LoginResponse | SignedUserResponse>(
    `/api/b/oauth2/code?code=${code}`,
  );
  return data;
};
