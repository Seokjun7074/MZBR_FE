import { useRecoilValue } from 'recoil';

import * as S from '@/pages/ShortFormPage/ShortFormPage.style';

import ShotFormContainer from '@/components/ShortForm/ShotFormContainer/ShotFormContainer';

import { useVideoListQuery } from '@/hooks/queries/useVideoListQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import { mapBoundaryState } from '@/store/map';
import { VideoInfo } from '@/types/shortForm';

const ShortFormPage = () => {
  const mapBoundary = useRecoilValue(mapBoundaryState);

  const { videoListData } = useVideoListQuery(mapBoundary!);
  console.log(videoListData);
  // const observerRef = useIntersectionObserver(() => fetchNextPage());

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
