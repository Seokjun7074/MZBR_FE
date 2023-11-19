import { useMutation } from '@tanstack/react-query';

import { postCheckNickname } from '@/apis/auth/postCheckNickname';

export const usePostCheckNicknameMutation = (
  setIdDuplicated: React.Dispatch<React.SetStateAction<boolean>>,
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const postCheckNicknameMutation = useMutation({
    mutationFn: postCheckNickname,
    onSuccess: ({ duplicated }) => {
      setIdDuplicated(duplicated);
      if (!duplicated) setIsConfirmed(true);
    },
  });

  return postCheckNicknameMutation;
};
