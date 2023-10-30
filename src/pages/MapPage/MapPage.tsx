import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import * as S from '@/pages/MapPage/MapPage.style';

import SearchMap from '@/components/Map/SearchMap/SearchMap';
import GoogleMapWrapper from '@/components/common/GoogleMapWrapper/GoogleMapWrapper';

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

  return (
    <S.MapPageWrapper>
      <GoogleMapWrapper>
        <SearchMap />
      </GoogleMapWrapper>
      <S.MapPageNavigationBar>
        <ShortFormButton style={{ cursor: 'pointer' }} />
        <AddButton style={{ cursor: 'pointer' }} />
        <MypageButton style={{ cursor: 'pointer' }} />
      </S.MapPageNavigationBar>
    </S.MapPageWrapper>
  );
};

export default MapPage;
