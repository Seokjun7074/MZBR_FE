import React, { useState } from 'react';

import * as S from './Withdrawal.style';

const Withdrawal = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleWithdrawal = () => {};

  return (
    <div>
      <S.Title>회원 탈퇴</S.Title>
      <S.Label>
        비밀번호
        <S.Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요."
        />
      </S.Label>
      <S.Label>
        비밀번호 확인
        <S.Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 입력하세요."
        />
      </S.Label>
      <S.Button onClick={handleWithdrawal}>회원 탈퇴</S.Button>
    </div>
  );
};

export default Withdrawal;
