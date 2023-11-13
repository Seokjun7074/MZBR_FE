import { useEffect, useState } from 'react';

interface Center {
  lat: number;
  lng: number;
}

export const useMyLocation = () => {
  const [myLocation, setMyLocation] = useState<Center | null>(null);

  const getSuccess = (position: any) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const curLocation = { lat, lng };
    setMyLocation(curLocation);
  };

  const getError = () => {
    alert('Geolocation Error');
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getSuccess, getError);
  }, []);

  return { myLocation };
};
