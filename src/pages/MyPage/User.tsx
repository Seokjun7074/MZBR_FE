// MyUserPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

const MyUserPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const parsedUserId = userId ? parseInt(userId, 10) : null;

  const [user, setUser] = useState<User>({
    userId: 123, // 예시 userId, 실제로는 동적으로 설정해야 함
    accessToken: 'some_initial_access_token',
    refreshToken: 'some_initial_refresh_token',
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    nickname: '',
    profileImage: '',
    subscribeNum: 0,
    postNum: 0,
  });

  const [videos, setVideos] = useState<Video[]>([]); // 동영상 목록 상태 추가

  useEffect(() => {
    if (parsedUserId !== null && !isNaN(parsedUserId)) {
      useUserProfile(parsedUserId, user, setUser, setUserProfile);
      const fetchedVideos = useMyVideos(parsedUserId, user, setUser);
      setVideos(fetchedVideos); // 동영상 목록 상태 업데이트
    }
  }, [parsedUserId, user.accessToken]);
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
        </UserInfo>
      </ProfileSection>
      <VideosGrid>
        {videos.map((video) => (
          <VideoThumbnail key={video.id} src={video.thumbnail_url} alt="Video Thumbnail" />
        ))}
      </VideosGrid>
      s
    </PageWrapper>
  );
};

export default MyUserPage;
