import { useEffect, useState } from 'react';

export const useMyLocation = () => {
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

  return { myLocation };
};
