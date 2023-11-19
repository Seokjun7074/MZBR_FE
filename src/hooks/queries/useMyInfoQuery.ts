import { useQuery } from '@tanstack/react-query';

import { getMyInfo } from '@/apis/auth/getMyInfo';

import { MyInfo } from '@/types/user';

export const useMyInfoQuery = () => {
  const { data } = useQuery<MyInfo>({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
  });

  return {
    myInfoData: data,
  };
};
