import { useMutation } from '@tanstack/react-query';

import { kakaoLogin } from '@/apis/auth/kakaoLogin';

import { PATH } from '@/constants/path';

export const useLoginMutation = () => {
  const loginMutation = useMutation({
    mutationFn: kakaoLogin,
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem('Authorization', data.ownJwtAccessToken);
      localStorage.setItem('userId', data.social_id);

      if (data.user) {
        localStorage.setItem('Authorization-refresh', data.ownJwtRefreshToken!);
        window.location.replace(PATH.MAP);
        return;
      }
      window.location.replace(PATH.SIGNUP);
    },
    onError: () => {
      alert('로그인 오류 발생! 잠시 후 다시 시도해주세용😅');
      window.location.replace(PATH.ROOT);
    },
  });

  return loginMutation;
};
