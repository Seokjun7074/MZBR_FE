import * as S from '@/components/Review/ReviewStar/ReviewStar.style';

interface ReviewStarProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const ReviewStar = ({ rating, setRating }: ReviewStarProps) => {
  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <S.StarContainer>
      {[...Array(5)].map((_, index) => (
        <S.Star key={index} $filled={index < rating} onClick={() => handleStarClick(index)}>
          ★
        </S.Star>
      ))}
    </S.StarContainer>
  );
};

export default ReviewStar;
