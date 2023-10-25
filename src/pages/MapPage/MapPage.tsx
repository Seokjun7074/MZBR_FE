import { useEffect, useState } from 'react';

import * as S from '@/pages/MapPage/MapPage.style';

import GoogleMapWrapper from '@/components/common/GoogleMapWrapper/GoogleMapWrapper';
import Map from '@/components/common/Map/Map';

const MapPage = () => {
  const [myLocation, setMyLocation] = useState({ lat: 12.345, lng: 678.91 });

  const getSuccess = (position: any) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const curLocation = { lat, lng };
    setMyLocation(curLocation);
  };

  const getError = () => {
    alert('Geolocation Error');
    const center = { lat: 37.569227, lng: 126.9777256 };
    setMyLocation(center);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getSuccess, getError);
  }, []);

  return (
    <S.MapPageWrapper>
      <GoogleMapWrapper>
        <Map center={myLocation} zoom={14} />
      </GoogleMapWrapper>
    </S.MapPageWrapper>
  );
};

export default MapPage;
