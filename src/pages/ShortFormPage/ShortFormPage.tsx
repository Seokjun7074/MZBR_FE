import * as S from '@/pages/ShortFormPage/ShortFormPage.style';

import ShotFormContainer from '@/components/ShortForm/ShotFormContainer/ShotFormContainer';

import { useVideoListQuery } from '@/hooks/queries/useVideoListQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const ShortFormPage = () => {
  const aa = {
    topLat: 123,
    topLong: 123,
    bottomLat: 123,
    bottomLong: 123,
  };

  const { videoListData, fetchNextPage } = useVideoListQuery(aa);
  const observerRef = useIntersectionObserver(() => fetchNextPage());
  const getNextVideoList = () => {
    fetchNextPage();
  };

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
