import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './MyVideo.style';

const MyVideo = () => {
  const navigate = useNavigate();

  return (
    <div>
      <S.ButtonContainer>
        <S.Button active onClick={() => {}}>
          내 영상
        </S.Button>
        <S.Button onClick={() => navigate('/mypage/likevideo')}>좋아요한 영상</S.Button>
        <S.Button onClick={() => navigate('/mypage/watchinglist')}>시청기록</S.Button>
      </S.ButtonContainer>
      {/* 추가적으로 여기에 각 버튼에 따른 영상 목록을 렌더링할 수 있습니다. */}
    </div>
  );
};

export default MyVideo;
