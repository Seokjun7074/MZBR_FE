import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMyVideos } from '@/apis/mypage/getMyVideo';

import * as S from './MyVideo.style';

export interface User {
  userId: number;
  accessToken: string;
  refreshToken: string;
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

const MyVideo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    userId: 1,
    accessToken: 'some_initial_access_token',
    refreshToken: 'some_initdsial_refresh_token',
  });

  const videos = useMyVideos(user, setUser);

  const handleThumbnailClick = (id: string) => {
    navigate(`/video/${id}`);
  };

  return (
    <div>
      <S.ButtonContainer></S.ButtonContainer>

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

export default MyVideo;
