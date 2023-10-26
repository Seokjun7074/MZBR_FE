import * as S from '@/pages/MapPage/MapPage.style';

import GoogleMapWrapper from '@/components/common/GoogleMapWrapper/GoogleMapWrapper';
import Map from '@/components/common/Map/Map';

import { useMyLocation } from '@/hooks/useMyLocation';

import AddButton from '@/assets/navigationBar/add_button.svg';
import MypageButton from '@/assets/navigationBar/mypage_button.svg';
import ShortFormButton from '@/assets/navigationBar/shortform_button.svg';

const MapPage = () => {
  const { myLocation } = useMyLocation();

  return (
    <S.MapPageWrapper>
      <GoogleMapWrapper>
        <Map center={myLocation} zoom={14} />
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
