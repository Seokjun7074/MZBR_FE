import { useEffect } from 'react';

import Spinner from '@/components/common/Spinner/Spinner';

import { useLoginMutation } from '@/hooks/mutations/useLoginMutation';

import { PATH } from '@/constants/path';

const KakaoRedirectPage = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const loginMutation = useLoginMutation();

  if (!code) {
    alert('카카오 코드 오류 발생! 잠시 후 다시 시도해주세용😅');
    window.location.replace(PATH.ROOT);
    return;
  }

  useEffect(() => {
    if (code) loginMutation.mutate(code);
  }, []);

  return <Spinner />;
};

export default KakaoRedirectPage;
