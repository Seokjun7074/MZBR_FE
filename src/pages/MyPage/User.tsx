import { useParams } from 'react-router-dom';

import { axiosInstance } from '../../apis/index';
import { useMyVideos } from '../../apis/mypage/getMyVideo';
import { useUserProfile } from '../../apis/mypage/getUserInfo';
import ProfilePlaceholder from '../../assets/Profile.png';
import {
  PageWrapper,
  ProfileImage,
  ProfileSection,
  SubscribeButton,
  UserInfo,
  UserInfoText,
  UserStats,
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

const UserPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const parsedUserId = userId ? parseInt(userId, 10) : null;

  const userProfile = parsedUserId !== null ? useUserProfile(parsedUserId) : null;
  const videos = parsedUserId !== null ? useMyVideos(parsedUserId) : [];

  const handleSubscribe = async () => {
    try {
      const response = await axiosInstance.post(`/api/b/users/subscribe/${parsedUserId}`);

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
        {userProfile && (
          <UserInfo>
            <ProfileImage
              src={userProfile.profileImage || ProfilePlaceholder}
              alt={userProfile.nickname || 'Profile'}
            />
            <h3>{userProfile.nickname}</h3>
            <UserStats>
              <UserInfoText>구독자: {userProfile.subscribeNum}</UserInfoText>
              <UserInfoText>게시물: {userProfile.postNum}</UserInfoText>
            </UserStats>
            <SubscribeButton onClick={handleSubscribe}>구독</SubscribeButton>
          </UserInfo>
        )}
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
