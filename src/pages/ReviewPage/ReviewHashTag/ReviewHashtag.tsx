import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import * as S from '@/pages/ReviewPage/ReviewHashTag/ReviewHashTag.style';

import HashTagInput from '@/components/common/HashTagInput/HashTagInput';

import { useHasgTag } from '@/hooks/useHashTag';

import { PATH } from '@/constants/path';

import { reviewRequestState } from '@/store/reviewRequest';

const ReviewHashTag = () => {
  const { tag, tagList, onChange, onKeydown, deleteHashTag } = useHasgTag();
  const navigate = useNavigate();
  const { restaurant_id } = useParams<{ restaurant_id: string }>();
  const [reviewRequest, setReviewRequest] = useRecoilState(reviewRequestState);

  const handleSubmit = () => {
    setReviewRequest({ videoMetadata: { ...reviewRequest.videoMetadata, tags: tagList } });
    navigate(PATH.REVIEW_UPLOAD(restaurant_id!));
  };

  return (
    <S.ReviewHashTagWrapper>
      <S.ReviewTitleHeaderText>해시태그를 입력해주세요!</S.ReviewTitleHeaderText>
      <S.ReviewHashTag>
        <HashTagInput
          tag={tag}
          tagList={tagList}
          onChange={onChange}
          onKeydown={onKeydown}
          deleteHashTag={deleteHashTag}
        />
      </S.ReviewHashTag>
      <S.ReviewTitleSubmitButton onClick={handleSubmit}>다음</S.ReviewTitleSubmitButton>
    </S.ReviewHashTagWrapper>
  );
};

export default ReviewHashTag;
