import { useEffect } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import * as S from '@/pages/MapPage/MapPage.style';

import SearchMap from '@/components/Map/SearchMap/SearchMap';
import GoogleMapWrapper from '@/components/common/GoogleMapWrapper/GoogleMapWrapper';

import { useMyLocation } from '@/hooks/useMyLocation';

import AddButton from '@/assets/navigationBar/add_button.svg';
import MypageButton from '@/assets/navigationBar/mypage_button.svg';
import ShortFormButton from '@/assets/navigationBar/shortform_button.svg';

import { centerState, mapBoundaryState, myPositionState } from '@/store/map';

const MapPage = () => {
  const { myLocation } = useMyLocation();
  const [myPosition, setMyPositionState] = useRecoilState(myPositionState);
  const setCenter = useSetRecoilState(centerState);
  const mapBoundary = useRecoilValue(mapBoundaryState);

  useEffect(() => {
    if (myLocation) {
      console.log('내 위치');
      setMyPositionState(myLocation);
      setCenter(myLocation);
    }
  }, [myLocation]);

  const checkMapBoundary = () => {
    if (mapBoundary) return true;
    return false;
  };

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
