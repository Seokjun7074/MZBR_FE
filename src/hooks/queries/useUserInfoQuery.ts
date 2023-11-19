import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/apis/user/getUserInfo';

import { MyInfo } from '@/types/user';

export const useUserInfoQuery = (userId: string) => {
  const { data } = useQuery<MyInfo>({
    queryKey: ['myInfo'],
    queryFn: () => getUserInfo(userId),
  });

  return {
    userInfoData: data,
  };
};
