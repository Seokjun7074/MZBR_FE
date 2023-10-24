import { useMutation } from '@tanstack/react-query';

import { postCheckNickname } from '@/apis/auth/postCheckNickname';

export const usePostCheckNicknameMutation = () => {
  const postCheckNicknameMutation = useMutation({
    mutationFn: postCheckNickname,
  });

  return postCheckNicknameMutation;
};
