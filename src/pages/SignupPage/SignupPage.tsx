import { useState } from 'react';

import * as S from '@/pages/SignupPage/SignupPage.style';

import { usePostCheckNicknameMutation } from '@/hooks/mutations/usePostCheckNicknameMutation';
import { usePostSignupMutation } from '@/hooks/mutations/usePostSignupMutation';
import { useInput } from '@/hooks/useInput';

const SignupPage = () => {
  const { value: nickname, handleInput } = useInput('');
  const [isDuplicated, setIdDuplicated] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const postCheckNicknameMutation = usePostCheckNicknameMutation(setIdDuplicated, setIsConfirmed);
  const postSignupMutation = usePostSignupMutation();

  const checkNicknameDuplication = () => {
    if (nickname.length < 3) {
      alert('닉네임은 3자 이상입니다.');
      return;
    }
    postCheckNicknameMutation.mutate(nickname);
  };

  const handleSignup = () => {
    if (!isConfirmed || isDuplicated || nickname === '') return;
    postSignupMutation.mutate(nickname);
  };

  return (
    <S.SignupPageWrapper>
      <S.SignupMessage>닉네임을 입력해주세요</S.SignupMessage>

      <S.NicknameContainer>
        <S.InputContainer>
          <S.NicknameInput
            type="text"
            maxLength={10}
            placeholder="10자 이하의닉네임"
            onChange={handleInput}
            value={nickname}
          />
          <S.DuplicationButton onClick={checkNicknameDuplication}>중복 확인</S.DuplicationButton>
        </S.InputContainer>
        {isDuplicated && <S.NicknameNotification>중복된 닉네임입니다.</S.NicknameNotification>}
        {!isDuplicated && isConfirmed && (
          <S.ConfirmNotification>사용가능한 닉네임입니다.</S.ConfirmNotification>
        )}
      </S.NicknameContainer>
      <S.SignupButton onClick={handleSignup}>회원가입</S.SignupButton>
    </S.SignupPageWrapper>
  );
};
export default SignupPage;
