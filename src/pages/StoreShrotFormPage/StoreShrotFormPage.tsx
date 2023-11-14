import { useParams } from 'react-router-dom';

import * as S from '@/pages/StoreShrotFormPage/StoreShrotFormPage.style';

import ShotFormContainer from '@/components/ShortForm/ShotFormContainer/ShotFormContainer';

import { useRestaurantVideoListQuery } from '@/hooks/queries/useRestaurantVideoListQuery';

import { VideoInfo } from '@/types/shortForm';

const StoreShrotFormPage = () => {
  const { storeId } = useParams();
  const { restaurantVideoListData } = useRestaurantVideoListQuery(storeId!);

  return (
    <S.StoreShrotFormPageWrapper>
      {restaurantVideoListData?.videoDtos.map((item: VideoInfo) => (
        <ShotFormContainer key={item.id} videoInfo={item} />
      ))}
    </S.StoreShrotFormPageWrapper>
  );
};

export default StoreShrotFormPage;
