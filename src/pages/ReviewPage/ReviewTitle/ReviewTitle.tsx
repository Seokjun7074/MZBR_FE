import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import * as S from '@/pages/ReviewPage/ReviewTitle/ReviewTitle.style';

type ReviewData = {
  title: string;
  content: string;
  rating: number;
};

const ReviewTitle = () => {
  const navigate = useNavigate();
  const { restaurant_id } = useParams<{ restaurant_id: string }>();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    const reviewData: ReviewData = {
      title,
      content,
      rating,
    };
    console.log(reviewData);
    navigate('/review/:restaurant_id/hashtag');
  };

  return (
    <S.ReviewTitleWrapper>
      <S.ReviewTitleHeaderText>리뷰를 입력해주세요!</S.ReviewTitleHeaderText>

      <S.LabelContainer>
        <S.ReviewTitleLabel>제목</S.ReviewTitleLabel>
        <S.ReviewTitleInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </S.LabelContainer>

      <S.LabelContainer>
        <S.ReviewTitleLabel>내용</S.ReviewTitleLabel>
        <S.ReviewTitleTextArea value={content} onChange={(e) => setContent(e.target.value)} />
      </S.LabelContainer>
      <S.LabelContainer>
        <S.ReviewTitleLabel>별점</S.ReviewTitleLabel>
        <S.StarContainer>
          {[...Array(5)].map((_, index) => (
            <S.Star key={index} $filled={index < rating} onClick={() => handleStarClick(index)}>
              ★
            </S.Star>
          ))}
        </S.StarContainer>
      </S.LabelContainer>
      <S.ReviewTitleSubmitButton onClick={handleSubmit}>다음</S.ReviewTitleSubmitButton>
    </S.ReviewTitleWrapper>
  );
};

export default ReviewTitle;
