import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState, useSetRecoilState } from 'recoil';

import * as S from '@/pages/MapPage/MapPage.style';

import SearchMap from '@/components/Map/SearchMap/SearchMap';
import GoogleMapWrapper from '@/components/common/GoogleMapWrapper/GoogleMapWrapper';

import { useMyLocation } from '@/hooks/useMyLocation';

import { PATH } from '@/constants/path';

import ShortFormButton from '@/assets/navigationBar/shortform_button.svg';

import { centerState, myPositionState } from '@/store/map';

const MapPage = () => {
  const { myLocation } = useMyLocation();
  const navigate = useNavigate();
  const setMyPositionState = useSetRecoilState(myPositionState);
  const setCenter = useSetRecoilState(centerState);

  useEffect(() => {
    if (myLocation) {
      setMyPositionState(myLocation);
      setCenter(myLocation);
    }
  }, [myLocation]);

  return (
    <S.MapPageWrapper>
      <GoogleMapWrapper>
        <SearchMap />
      </GoogleMapWrapper>
      {/* <S.FloatingButton>
        <ShortFormButton style={{ cursor: 'pointer' }} onClick={() => navigate(PATH.SHORT_FORM)} />
      </S.FloatingButton> */}
    </S.MapPageWrapper>
  );
};

export default MapPage;
