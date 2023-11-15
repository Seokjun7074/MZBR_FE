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
  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId ? parseInt(storedUserId, 10) : 1;

  const videos = useLikedVideos(userId);

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
