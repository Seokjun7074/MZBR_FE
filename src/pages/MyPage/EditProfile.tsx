import { ChangeEvent, useState } from 'react';

import { useProfileImageUpdater } from '@/apis/mypage/putUserProfileImage';

import Profile from '../../assets/Profile.png';
import * as S from './EditProfile.style';

export type user = {
  id: number;
  nickname: string;
  profileImage: string;
};

export type User = {
  userId: number;
  profileImage: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
};

const EditProfile = () => {
  const [user, setUser] = useState<User>({
    userId: 1,
    profileImage: Profile,
    nickname: '',
    accessToken: 'some_initial_access_token',
    refreshToken: 'some_initial_refresh_token',
  });

  // useProfileImageUpdater 훅 호출
  const { setProfileImage, updateResult } = useProfileImageUpdater(user, setUser);

  // 파일 변경 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };
  return (
    <S.Container>
      <S.TopSection>
        <S.ProfileImage src={user.profileImage} alt="Profile" />
        <S.RightSection>
          <S.Nickname>{user.nickname}</S.Nickname>
          <input type="file" onChange={handleFileChange} />
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
