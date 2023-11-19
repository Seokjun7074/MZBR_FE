import { useMutation } from '@tanstack/react-query';

import { postSubscribe } from '@/apis/user/postSubscribe';

export const useSubscribeMutation = () => {
  const subscribeMutation = useMutation({
    mutationFn: (userId: string) => postSubscribe(userId),
    onSuccess: () => {},
  });

  return subscribeMutation;
};
