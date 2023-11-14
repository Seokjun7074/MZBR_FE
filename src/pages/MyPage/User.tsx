import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { useMyVideos } from '../../apis/Video/getUserVideo';
import { useUserProfile } from '../../apis/mypage/getUserInfo';
import ProfilePlaceholder from '../../assets/Profile.png';
import {
  PageWrapper,
  ProfileImage,
  ProfileSection,
  UserInfo,
  VideoThumbnail,
  VideosGrid,
} from './User.style';

export interface User {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  nickname: string;
  profileImage: string;
  subscribeNum: number;
  postNum: number;
}

export interface Video {
  id: string;
  thumbnail_url: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const BASE_URL = 'http://localhost:3000';

const UserPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const parsedUserId = userId ? parseInt(userId, 10) : null;

  const [user, setUser] = useState<User>({
    userId: 123,
    accessToken: 'some_initial_access_token',
    refreshToken: 'some_initial_refresh_token',
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    nickname: '',
    profileImage: '',
    subscribeNum: 0,
    postNum: 0,
  });

  const navigate = useNavigate();

  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (parsedUserId !== null && !isNaN(parsedUserId)) {
      useUserProfile(parsedUserId, user, setUser, setUserProfile);
      useMyVideos(parsedUserId, user, setUser, navigate);
    }
  }, [parsedUserId, user.accessToken]);

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/subscribe/${parsedUserId}`,
        {},
        { headers: { 'access-token': user.accessToken } },
      );

      if (response.data.success) {
        console.log('구독 성공');
      } else {
        console.log('구독 실패:', response.data.error);
      }
    } catch (error) {
      console.error('구독 중 오류 발생:', error);
    }
  };

  return (
    <PageWrapper>
      <ProfileSection>
        <ProfileImage
          src={userProfile.profileImage || ProfilePlaceholder}
          alt={userProfile.nickname || 'Profile'}
        />
        <UserInfo>
          <h3>{userProfile.nickname}</h3>
          <p>구독자: {userProfile.subscribeNum}</p>
          <p>게시물: {userProfile.postNum}</p>
          <button onClick={handleSubscribe}>구독하기</button>
        </UserInfo>
      </ProfileSection>

      <VideosGrid>
        {videos.map((video) => (
          <VideoThumbnail key={video.id} src={video.thumbnail_url} alt="Video Thumbnail" />
        ))}
      </VideosGrid>
    </PageWrapper>
  );
};

export default UserPage;
