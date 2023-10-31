import { useEffect } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import * as S from '@/pages/MapPage/MapPage.style';

import SearchMap from '@/components/Map/SearchMap/SearchMap';
import GoogleMapWrapper from '@/components/common/GoogleMapWrapper/GoogleMapWrapper';

import { useMyLocation } from '@/hooks/useMyLocation';

import AddButton from '@/assets/navigationBar/add_button.svg';
import MypageButton from '@/assets/navigationBar/mypage_button.svg';
import ShortFormButton from '@/assets/navigationBar/shortform_button.svg';

import { centerState, myPositionState } from '@/store/map';

const MapPage = () => {
  const { myLocation } = useMyLocation();
  const [myPosition, setMyPositionState] = useRecoilState(myPositionState);
  const setCenter = useSetRecoilState(centerState);

  useEffect(() => {
    setMyPositionState(myLocation);
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
