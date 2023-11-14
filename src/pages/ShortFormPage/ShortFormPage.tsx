import { useRecoilValue } from 'recoil';

import * as S from '@/pages/ShortFormPage/ShortFormPage.style';

import ShotFormContainer from '@/components/ShortForm/ShotFormContainer/ShotFormContainer';

import { useVideoListQuery } from '@/hooks/queries/useVideoListQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import { mapBoundaryState } from '@/store/map';

const ShortFormPage = () => {
  const mapBoundary = useRecoilValue(mapBoundaryState);

  const { videoListData, fetchNextPage } = useVideoListQuery(mapBoundary!);
  const observerRef = useIntersectionObserver(() => fetchNextPage());

  return (
    <S.ShortFormPageWrapper>
      {videoListData?.pages.map((item) => (
        <ShotFormContainer key={item.videoUUID} videoPath={item.videoPath} />
      ))}
      <div ref={observerRef} />
    </S.ShortFormPageWrapper>
  );
};

export default ShortFormPage;
