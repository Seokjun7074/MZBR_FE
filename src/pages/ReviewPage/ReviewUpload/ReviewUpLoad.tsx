// UpLoad.tsx
import ArchiveBox from '@assets/ArchiveBox.png';
import Vector from '@assets/Group.png';

import { useNavigate, useParams } from 'react-router-dom';

import * as S from './ReviewUpLoad.style';

const ReviewUpLoad = () => {
  const { restaurant_id } = useParams<{ restaurant_id: string }>();
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    navigate(`/review/${restaurant_id}/edit`);
  };

  return (
    <S.Container>
      <S.Heading>리뷰 영상을 업로드 해주세요</S.Heading>

      <S.Box to={`/review/${restaurant_id}/upload/1`}>
        <S.Image src={Vector} alt="Vector Image" />

        <S.ImageCaption>동영상 찍기</S.ImageCaption>
      </S.Box>

      <S.Box to={`/review/${restaurant_id}/upload/2`}>
        <S.Image src={ArchiveBox} alt="Archive Box Image" />
        <S.ImageCaption>동영상 업로드하기</S.ImageCaption>
      </S.Box>

      <S.NextButton onClick={handleNextButtonClick}>다음</S.NextButton>
    </S.Container>
  );
};

export default ReviewUpLoad;
