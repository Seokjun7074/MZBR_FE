import { v4 as uuidv4 } from 'uuid';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import * as S from '@/pages/ReviewPage/ReviewTitle/ReviewTitle.style';

import ReviewStar from '@/components/Review/ReviewStar/ReviewStar';

import { PATH } from '@/constants/path';

import { reviewRequestState } from '@/store/reviewRequest';

const ReviewTitle = () => {
  const navigate = useNavigate();
  const { restaurant_id } = useParams<{ restaurant_id: string }>();

  const [description, setDescription] = useState('');
  const [star, setStar] = useState(0); // 별점
  const [reviewRequest, setReviewRequest] = useRecoilState(reviewRequestState);

  const handleSubmit = () => {
    setReviewRequest({ ...reviewRequest, description, star });
    navigate(PATH.REVIEW_HASHTAG(restaurant_id!));
  };
  return (
    <S.ReviewTitleWrapper>
      <S.ReviewTitleHeaderText>리뷰를 입력해주세요!</S.ReviewTitleHeaderText>

      <S.LabelContainer>
        <S.ReviewTitleLabel>내용</S.ReviewTitleLabel>
        <S.ReviewTitleTextArea
          type="text"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        />
      </S.LabelContainer>

      <S.LabelContainer>
        <S.ReviewTitleLabel>별점</S.ReviewTitleLabel>
        <ReviewStar rating={star} setRating={setStar} />
      </S.LabelContainer>

      <S.ReviewTitleSubmitButton onClick={handleSubmit}>다음</S.ReviewTitleSubmitButton>
    </S.ReviewTitleWrapper>
  );
};

export default ReviewTitle;
