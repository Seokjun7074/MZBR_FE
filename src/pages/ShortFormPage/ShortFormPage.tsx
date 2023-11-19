import { useNavigate } from 'react-router-dom';

import * as S from '@/pages/ShortFormPage/ShortFormPage.style';

import ShotFormContainer from '@/components/ShortForm/ShotFormContainer/ShotFormContainer';
import Spinner from '@/components/common/Spinner/Spinner';

import { useVideoListQuery } from '@/hooks/queries/useVideoListQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import { PATH } from '@/constants/path';

import { VideoInfo } from '@/types/shortForm';

const ShortFormPage = () => {
  const navigate = useNavigate();
  const mapBoundary = JSON.parse(sessionStorage.getItem('mapBoundary')!);

  const { videoListData, isLoading } = useVideoListQuery(mapBoundary!);
  // const observerRef = useIntersectionObserver(() => fetchNextPage());

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading && videoListData?.videos.length < 1) {
    return (
      <S.EmptyReviewContainer>
        <h1>주변에 리뷰가 없어요 😅</h1>
        <S.ReviewButton onClick={() => navigate(-1)}>지도로 돌아가기</S.ReviewButton>
      </S.EmptyReviewContainer>
    );
  }

  return (
    <S.ShortFormPageWrapper>
      {videoListData?.videos.map((item: VideoInfo) => (
        <ShotFormContainer key={item.id} videoInfo={item} />
      ))}
      {/* <div ref={observerRef} /> */}
    </S.ShortFormPageWrapper>
  );
};

export default ShortFormPage;
