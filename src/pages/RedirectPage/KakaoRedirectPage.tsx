import { useLoginQuery } from '@/hooks/queries/useLoginQuery';

const KakaoRedirectPage = () => {
  const code = new URL(window.location.href).searchParams.get('code');

  const { kakaoLoginData, status } = useLoginQuery(code!, 'KAKAO');
  if (status === 'success') {
    console.log(kakaoLoginData);
  }

  return <div>카카오 로그인중...</div>;
};

export default KakaoRedirectPage;
