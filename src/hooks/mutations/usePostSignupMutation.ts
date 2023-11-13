import { useMutation } from '@tanstack/react-query';

import { postSignup } from '@/apis/auth/postSignup';

import { PATH } from '@/constants/path';

export const usePostSignupMutation = () => {
  const postSignupMutation = useMutation({
    mutationFn: (nickname: string) => postSignup(nickname),
    onSuccess: () => {
      window.location.replace(PATH.MAP);
    },
  });

  return postSignupMutation;
};
