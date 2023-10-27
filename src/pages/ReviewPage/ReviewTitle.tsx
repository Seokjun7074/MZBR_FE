import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  HeaderText,
  Input,
  Label,
  Star,
  StarContainer,
  SubmitButton,
  TextArea,
} from './ReviewTitle.style';

type ReviewData = {
  title: string;
  content: string;
  rating: number;
};

const Review = () => {
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
    <Container>
      <HeaderText>리뷰를 입력해주세요!</HeaderText>

      <Label>제목</Label>
      <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <Label>내용</Label>
      <TextArea value={content} onChange={(e) => setContent(e.target.value)} />

      <Label>별점</Label>
      <StarContainer>
        {[...Array(5)].map((_, index) => (
          <Star key={index} filled={index < rating} onClick={() => handleStarClick(index)}>
            ★
          </Star>
        ))}
      </StarContainer>
      <SubmitButton onClick={handleSubmit}>다음</SubmitButton>
    </Container>
  );
};

export default Review;
