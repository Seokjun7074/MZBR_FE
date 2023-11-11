import React, { ChangeEvent, useState } from 'react';

import { useProfileImageUpdater } from '@/apis/mypage/putUserProfileImage';

import Profile from '../../assets/Profile.png';
import * as S from './EditProfile.style';

export type Member = {
  id: number;
  nickname: string;
  profile_image: string;
};

export type User = {
  userId: number;
  profileImage: string;
  accessToken: string;
  refreshToken: string;
};

const EditProfile = () => {
  const [member, setMember] = useState<Member>({
    id: 1,
    nickname: 'JohnDoe',
    profile_image: Profile,
  });
  const [user, setUser] = useState<User>({
    userId: 1,
    profileImage: Profile,
    accessToken: 'some_initial_access_token',
    refreshToken: 'some_initial_refresh_token',
  });

  const { setProfileImage, updateResult } = useProfileImageUpdater(user, setUser);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
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
