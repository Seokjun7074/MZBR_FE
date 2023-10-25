import * as S from '@/pages/MapPage/MapPage.style';

import GoogleMapWrapper from '@/components/common/GoogleMapWrapper/GoogleMapWrapper';
import Map from '@/components/common/Map/Map';

import { useMyLocation } from '@/hooks/useMyLocation';

const MapPage = () => {
  const { myLocation } = useMyLocation();

  return (
    <S.MapPageWrapper>
      <GoogleMapWrapper>
        <Map center={myLocation} zoom={14} />
      </GoogleMapWrapper>
    </S.MapPageWrapper>
  );
};

export default MapPage;
