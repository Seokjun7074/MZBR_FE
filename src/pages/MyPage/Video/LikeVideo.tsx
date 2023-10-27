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

const LikeVideo = () => {
  const navigate = useNavigate();

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
        {dummyData.map((video) => (
          <S.Thumbnail
            key={video.id}
            src={video.thumbnail}
            alt={`Thumbnail for video ${video.id}`}
          />
        ))}
      </S.VideoGrid>
    </div>
  );
};

export default LikeVideo;
