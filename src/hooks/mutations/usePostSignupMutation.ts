import { useMutation } from '@tanstack/react-query';

import { postSignup } from '@/apis/auth/postSignup';

export const usePostSignupMutation = () => {
  const postSignupMutation = useMutation({
    mutationFn: (nickname: string) => postSignup(nickname),
  });

  return postSignupMutation;
};
