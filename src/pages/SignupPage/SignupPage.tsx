import { useState } from 'react';

import * as S from '@/pages/SignupPage/SignupPage.style';

const SignupPage = () => {
  const [isDuplicated, setIdDuplicated] = useState(false);

  return (
    <S.SignupPageWrapper>
      <S.SignupMessage>닉네임을 입력해주세요</S.SignupMessage>

      <S.NicknameContainer>
        <S.InputContainer>
          <S.NicknameInput type="text" maxLength={10} placeholder="10자 이하의닉네임" />
          <S.DuplicationButton>중복 확인</S.DuplicationButton>
        </S.InputContainer>
        {isDuplicated && <S.NicknameNotification>중복된 닉네임입니다.</S.NicknameNotification>}
      </S.NicknameContainer>
      <S.SignupButton>회원가입</S.SignupButton>
    </S.SignupPageWrapper>
  );
};
export default SignupPage;
