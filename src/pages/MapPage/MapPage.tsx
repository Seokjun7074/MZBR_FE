import { useEffect } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import * as S from '@/pages/MapPage/MapPage.style';

import SearchMap from '@/components/Map/SearchMap/SearchMap';
import GoogleMapWrapper from '@/components/common/GoogleMapWrapper/GoogleMapWrapper';
import Spinner from '@/components/common/Spinner/Spinner';

import { useMyLocation } from '@/hooks/useMyLocation';
import { useResetVideo } from '@/hooks/useResetVideo';

import { centerState, myPositionState } from '@/store/map';

const MapPage = () => {
  const { myLocation } = useMyLocation();
  const setMyPositionState = useSetRecoilState(myPositionState);
  const [center, setCenter] = useRecoilState(centerState);
  const { resetAllVideoAtom } = useResetVideo();

  useEffect(() => {
    if (myLocation) {
      setMyPositionState(myLocation);
      setCenter(myLocation);
    }
    resetAllVideoAtom();
  }, [myLocation]);

  if (!center) return <Spinner message="위치 정보를 불러오고 있어요!" />;
  return (
    <S.MapPageWrapper>
      <GoogleMapWrapper>
        <SearchMap center={center} />
      </GoogleMapWrapper>
    </S.MapPageWrapper>
  );
};

export default MapPage;
