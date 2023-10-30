import { PATH } from '@/constants/path';

const KakaoRedirectPage = () => {
  const accessToken = new URL(window.location.href).searchParams.get('accessToken');
  const refreshToken = new URL(window.location.href).searchParams.get('refreshToken');

  if (accessToken && refreshToken) {
    window.localStorage.setItem('accessToken', accessToken);
    window.location.replace(PATH.MAP);
  }

  return <div>카카오 로그인중...</div>;
};

export default KakaoRedirectPage;
