// MyPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Profile from '../../assets/Profile.png';
import { NavigationItem, PageWrapper, ProfileItem, VideoHeader } from './MyMain.style';

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      {/* 로그인 구현되면 바꾸기 */}
      <ProfileItem>
        <img src={Profile} alt="placeholder" />
        <span>최종명님</span>
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
