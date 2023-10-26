import React, { useState } from 'react';

import Profile from '../../assets/Profile.png';
import * as S from './EditProfile.style';

type Member = {
  id: number;
  nickname: string;
  profile_image: string;
};

const EditProfile: React.FC = () => {
  const [member] = useState<Member>({
    id: 1, // 더미 데이터
    nickname: 'JohnDoe',
    profile_image: Profile,
  });
  const [newNickname, setNewNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCheckNickname = () => {
    // 중복 검사 로직
  };

  const handleUpdateProfile = () => {
    // 프로필 업데이트 로직
  };

  return (
    <S.Container>
      <S.TopSection>
        <S.ProfileImage src={member.profile_image} alt="Profile" />
        <S.RightSection>
          <S.Nickname>{member.nickname}</S.Nickname>
          <S.ChangeImageButton>프로필 이미지 변경</S.ChangeImageButton>
        </S.RightSection>
      </S.TopSection>

      <h3>닉네임</h3>
      <S.InputGroup>
        <S.Input placeholder="새 닉네임을 입력하세요." />
        <S.CheckNicknameButton>중복검사</S.CheckNicknameButton>
      </S.InputGroup>

      <h3>비밀번호</h3>
      <S.Input placeholder="비밀번호를 입력하세요." type="password" />
      <h3>비밀번호 확인</h3>
      <S.Input placeholder="비밀번호를 다시 입력하세요." type="password" />

      <S.UpdateButton>수정하기</S.UpdateButton>
    </S.Container>
  );
};

export default EditProfile;
