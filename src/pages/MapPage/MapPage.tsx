import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import * as S from '@/pages/MapPage/MapPage.style';

import SearchMap from '@/components/SearchMap/SearchMap';
import GoogleMapWrapper from '@/components/common/GoogleMapWrapper/GoogleMapWrapper';

// import { useRestaurantListQuery } from '@/hooks/queries/userestaurantListQuery';
import { useMyLocation } from '@/hooks/useMyLocation';

import AddButton from '@/assets/navigationBar/add_button.svg';
import MypageButton from '@/assets/navigationBar/mypage_button.svg';
import ShortFormButton from '@/assets/navigationBar/shortform_button.svg';

import { centerState } from '@/store/map';

const MapPage = () => {
  const { myLocation } = useMyLocation();

  const [center, setCenter] = useRecoilState(centerState);

  useEffect(() => {
    setCenter(myLocation);
  }, [myLocation]);

  // 식당 리스트 fetch
  // const { restaurantListData } = useRestaurantListQuery({
  //   latitude: center.lat,
  //   longitude: center.lng,
  //   radius: 5,
  // });

  return (
    <S.MapPageWrapper>
      <GoogleMapWrapper>
        <SearchMap />
      </GoogleMapWrapper>
      <S.MapPageNavigationBar>
        <AddButton style={{ cursor: 'pointer' }} />
        <MypageButton style={{ cursor: 'pointer' }} />
        <ShortFormButton style={{ cursor: 'pointer' }} />
      </S.MapPageNavigationBar>
    </S.MapPageWrapper>
  );
};

export default MapPage;
