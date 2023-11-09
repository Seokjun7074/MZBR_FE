import * as S from '@/pages/ShortFormPage/ShortFormPage.style';

import ShotFormContainer from '@/components/ShortForm/ShotFormContainer/ShotFormContainer';

import { useVideoListQuery } from '@/hooks/queries/useVideoListQuery';

const ShortFormPage = () => {
  const aa = {
    toplat: 123,
    toplong: 123,
    bottomlat: 123,
    bottomlong: 123,
  };

  const { videoListData, fetchNextPage } = useVideoListQuery(aa);
  const getNextVideoList = () => {
    fetchNextPage();
  };

  return (
    <S.ShortFormPageWrapper>
      <button style={{ position: 'fixed', top: '10px' }} onClick={getNextVideoList}>
        <h1>FFFFFFFFFFFFFFFFF</h1>
      </button>
      {videoListData?.pages.map((item) => (
        <ShotFormContainer key={item.videoUUID} videoPath={item.videoPath} />
      ))}
    </S.ShortFormPageWrapper>
  );
};

export default ShortFormPage;
