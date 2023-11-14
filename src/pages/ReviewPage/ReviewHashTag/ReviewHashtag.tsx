import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import * as S from '@/pages/ReviewPage/ReviewHashTag/ReviewHashTag.style';

import HashTagInput from '@/components/common/HashTagInput/HashTagInput';

import { useHasgTag } from '@/hooks/useHashTag';

import { PATH } from '@/constants/path';

import { reviewRequestState } from '@/store/reviewRequest';

const ReviewHashTag = () => {
  const { tagList } = useHasgTag();
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const [reviewRequest, setReviewRequest] = useRecoilState(reviewRequestState);

  const handleSubmit = () => {
    setReviewRequest({ ...reviewRequest, tags: tagList, storeId: Number(storeId!) });
    navigate(PATH.REVIEW_UPLOAD(storeId!));
  };

  return (
    <S.ReviewHashTagWrapper>
      <S.ReviewTitleHeaderText>해시태그를 입력해주세요!</S.ReviewTitleHeaderText>
      <S.ReviewHashTag>
        <HashTagInput />
      </S.ReviewHashTag>
      <S.ReviewTitleSubmitButton onClick={handleSubmit}>다음</S.ReviewTitleSubmitButton>
    </S.ReviewHashTagWrapper>
  );
};

export default ReviewHashTag;
