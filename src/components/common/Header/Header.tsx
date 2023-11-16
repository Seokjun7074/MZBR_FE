import { useLocation, useNavigate } from 'react-router-dom';

import * as S from '@/components/common/Header/Header.style';

import { PATH } from '@/constants/path';

import BackArrow from '@/assets/navigationBar/backArrow.svg';
import MypageButton from '@/assets/navigationBar/mypage_button.svg';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname === PATH.MAP) {
    return (
      <S.HeaderWrapper $isMap={true}>
        <MypageButton />
      </S.HeaderWrapper>
    );
  }
  return (
    <S.HeaderWrapper $isMap={false}>
      <BackArrow onClick={() => navigate(-1)} />
    </S.HeaderWrapper>
  );
};

export default Header;
