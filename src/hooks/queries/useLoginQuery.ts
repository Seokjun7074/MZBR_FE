import { useQuery } from '@tanstack/react-query';

import { kakaoLogin } from '@/apis/auth/kakaoLogin';

export const useLoginQuery = (code: string, type: string) => {
  const { data, status } = useQuery({
    queryKey: ['login', code, type],
    queryFn: () => kakaoLogin(code),
  });
  return { kakaoLoginData: data!, status };
};
