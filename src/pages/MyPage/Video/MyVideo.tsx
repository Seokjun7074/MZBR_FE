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
  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId ? parseInt(storedUserId, 10) : 1;

  const videos = useMyVideos(userId);

  const handleThumbnailClick = (id: string) => {
    navigate(`/video/${id}`);
  };

  return (
    <div>
      <S.ButtonContainer>
        <S.Button active onClick={() => {}}>
          내영상
        </S.Button>
        <S.Button onClick={() => navigate('/mypage/likevideo')}>좋아요한 영상</S.Button>
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

export default MyVideo;
