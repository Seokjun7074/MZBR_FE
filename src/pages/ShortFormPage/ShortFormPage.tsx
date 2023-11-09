import * as S from '@/pages/ShortFormPage/ShortFormPage.style';

import ShotFormContainer from '@/components/ShortForm/ShotFormContainer/ShotFormContainer';

import { useVideoListQuery } from '@/hooks/queries/useVideoListQuery';

const ShortFormPage = () => {
  const aa = {
    latitude: 3,
    longitude: 3,
  };

  const { videoListData, fetchNextPage } = useVideoListQuery(aa);
  const getNextVideoList = () => {
    fetchNextPage();
  };

  console.log(videoListData?.pages);
  return (
    <S.ShortFormPageWrapper>
      <button style={{ position: 'fixed', top: '10px' }} onClick={getNextVideoList}>
        <h1>FFFFFFFFFFFFFFFFF</h1>
      </button>
      {videoListData?.pages.map((item) => (
        <ShotFormContainer
          key={item.videoUUID}
          videoUUID={item.videoUUID}
          videoPath={item.videoPath}
        />
      ))}
    </S.ShortFormPageWrapper>
  );
};

export default ShortFormPage;
