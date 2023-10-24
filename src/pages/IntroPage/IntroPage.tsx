import * as S from '@/pages/IntroPage/IntroPage.style';

import googleLogin from '@/assets/login/google_login.png';
import kakaoLogin from '@/assets/login/kakao_login.png';
import naverLogin from '@/assets/login/naver_login.png';
import Logo from '@/assets/logo/mzbr_logo_secondary.svg';

const IntroPage = () => {
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;

  const handleLogin = (link: string) => {
    window.location.href = link;
  };

  return (
    <S.IntroPageWrapper>
      <Logo />
      <S.LoginContainer>
        <S.LoginImage src={kakaoLogin} onClick={() => handleLogin(kakaoLink)} />
        <S.LoginImage src={googleLogin} />
        <S.LoginImage src={naverLogin} />
      </S.LoginContainer>
    </S.IntroPageWrapper>
  );
};

export default IntroPage;
