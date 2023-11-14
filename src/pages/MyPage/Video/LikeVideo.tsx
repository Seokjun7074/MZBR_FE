import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLikedVideos } from '@/apis/mypage/getLikeVideo';

import * as S from './MyVideo.style';

export interface User {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface Video {
  thumbnail_url: string;
  id: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const LikeVideo = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    userId: 1,
    accessToken: 'some_initial_access_token',
    refreshToken: 'some_initial_refresh_token',
  });

  const videos = useLikedVideos(user, setUser);

  const handleThumbnailClick = (id: string) => {
    navigate(`/video/${id}`);
  };

  return (
    <div>
      <S.ButtonContainer>
        <S.Button onClick={() => navigate('/mypage/myvideo')}>내영상</S.Button>
        <S.Button active onClick={() => {}}>
          좋아요한 영상
        </S.Button>
        <S.Button onClick={() => navigate('/mypage/watchinglist')}>시청기록</S.Button>
      </S.ButtonContainer>
      <S.VideoGrid>
        {videos.map((video) => (
          <S.Thumbnail
            key={video.id}
            src={video.thumbnail_url}
            alt={`Thumbnail for video ${video.id}`}
            onClick={() => handleThumbnailClick(video.id)}
          />
        ))}
      </S.VideoGrid>
    </div>
  );
};

export default LikeVideo;
