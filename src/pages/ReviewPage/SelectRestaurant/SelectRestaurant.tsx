import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';

import * as S from '@/pages/ReviewPage/SelectRestaurant/SelectRestaurant.style';

import GoogleMapWrapper from '@/components/common/GoogleMapWrapper/GoogleMapWrapper';

import { useMyLocation } from '@/hooks/useMyLocation';

import { centerState, myPositionState } from '@/store/map';

const SelectRestaurant = () => {
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
    <S.SelectRestaurantWrapper>
      <GoogleMapWrapper></GoogleMapWrapper>
    </S.SelectRestaurantWrapper>
  );
};

export default SelectRestaurant;
