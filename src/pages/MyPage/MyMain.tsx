import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserProfile } from '@/apis/mypage/getMyInfo';

import Profile from '../../assets/Profile.png';
import { NavigationItem, PageWrapper, ProfileItem, VideoHeader } from './MyMain.style';

export interface User {
  accessToken: string;
  refreshToken: string;
  nickname: string;
  profileImage: string;
  subscribeNum: number;
  postNum: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    accessToken: 'some_initial_access_token',
    refreshToken: 'some_initial_refresh_token',
    nickname: '',
    profileImage: '',
    subscribeNum: 0,
    postNum: 0,
  });

  useUserProfile(user, setUser);

  return (
    <PageWrapper>
      <ProfileItem>
        <img src={user.profileImage || Profile} alt={user.nickname || 'Profile'} />
        <span>{user.nickname || '사용자'}</span>
      </ProfileItem>
      <VideoHeader>영상</VideoHeader>
      <NavigationItem onClick={() => navigate('/mypage/myvideo')}>
        <span>내가 남긴 영상</span>
      </NavigationItem>
      <NavigationItem onClick={() => navigate('/mypage/likevideo')}>
        <span>좋아요한 영상</span>
      </NavigationItem>
      <NavigationItem onClick={() => navigate('/mypage/watchinglist')}>
        <span>시청 기록</span>
      </NavigationItem>
      <VideoHeader>소셜</VideoHeader>
      <NavigationItem onClick={() => navigate('/mypage/subscribedusers')}>
        <span>구독한 사용자</span>
      </NavigationItem>
      <NavigationItem onClick={() => navigate('/mypage/blockedusers')}>
        <span>차단한 사용자</span>
      </NavigationItem>
      <VideoHeader>식당</VideoHeader>
      <NavigationItem onClick={() => navigate('/mypage/favoriterestaurnat')}>
        <span>즐겨찾기한 식당</span>
      </NavigationItem>
    </PageWrapper>
  );
};

export default MyPage;
