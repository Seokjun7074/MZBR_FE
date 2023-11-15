import { useNavigate, useParams } from 'react-router-dom';

import * as S from '@/pages/StoreShrotFormPage/StoreShrotFormPage.style';

import ShotFormContainer from '@/components/ShortForm/ShotFormContainer/ShotFormContainer';

import { useRestaurantVideoListQuery } from '@/hooks/queries/useRestaurantVideoListQuery';

import { PATH } from '@/constants/path';

import { VideoInfo } from '@/types/shortForm';

const StoreShrotFormPage = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { restaurantVideoListData } = useRestaurantVideoListQuery(storeId!);

  if (restaurantVideoListData?.videos.length < 1) {
    return (
      <S.EmptyReviewContainer>
        <h1>등록된 리뷰가 없네요 😅</h1>
        <span>첫 리뷰를 등록해주세요!</span>
        <S.ReviewButton onClick={() => navigate(PATH.REVIEW(storeId!))}>
          ✏️ 첫 리뷰 등록하기
        </S.ReviewButton>
      </S.EmptyReviewContainer>
    );
  }

  return (
    <S.StoreShrotFormPageWrapper>
      {restaurantVideoListData?.videos.map((item: VideoInfo) => (
        <ShotFormContainer key={item.id} videoInfo={item} />
      ))}
    </S.StoreShrotFormPageWrapper>
  );
};

export default StoreShrotFormPage;
