import { useQuery } from '@tanstack/react-query';

import { getUserVideo } from '@/apis/user/getUserVideo';

export const useUserVideoQuery = (userId: string) => {
  const { data } = useQuery({
    queryKey: ['userVideo'],
    queryFn: () => getUserVideo(userId),
  });

  return {
    userVideoData: data?.videos,
  };
};
