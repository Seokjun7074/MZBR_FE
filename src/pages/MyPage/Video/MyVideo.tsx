import React from 'react';
import { useNavigate } from 'react-router-dom';

import Profile from '../../../assets/Profile.png';
import * as S from './MyVideo.style';

type Video = {
  thumbnail: string;
  id: number;
};

const dummyData: Video[] = [
  {
    thumbnail: Profile,
    id: 1,
  },
  {
    thumbnail: Profile,
    id: 2,
  },
  {
    thumbnail: Profile,
    id: 3,
  },
  {
    thumbnail: Profile,
    id: 4,
  },
];

const MyVideo = () => {
  const navigate = useNavigate();

  // 이 함수를 추가합니다.
  const handleThumbnailClick = (id: number) => {
    navigate(`/video/${id}`);
  };

  return (
    <div>
      <S.ButtonContainer>
        <S.Button active onClick={() => {}}>
          내 영상
        </S.Button>
        <S.Button onClick={() => navigate('/mypage/likevideo')}>좋아요한 영상</S.Button>
        <S.Button onClick={() => navigate('/mypage/watchinglist')}>시청기록</S.Button>
      </S.ButtonContainer>

      <S.VideoGrid>
        {dummyData.map((video) => (
          // Thumbnail을 클릭할 때 handleThumbnailClick 함수를 호출합니다.
          <S.Thumbnail
            key={video.id}
            src={video.thumbnail}
            alt={`Thumbnail for video ${video.id}`}
            onClick={() => handleThumbnailClick(video.id)}
          />
        ))}
      </S.VideoGrid>
    </div>
  );
};

export default MyVideo;
