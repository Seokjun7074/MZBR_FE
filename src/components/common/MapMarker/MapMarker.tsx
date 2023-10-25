import { useEffect, useRef } from 'react';
import { Root, createRoot } from 'react-dom/client';

import * as S from '@/components/common/MapMarker/MapMarker.style';

import Pin from '@/assets/map/pin.svg';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  map: google.maps.Map;
}
const MapMarker = ({ id, lat, lng, map }: MapMarker) => {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const rootRef = useRef<Root | null>(null);

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement('div');
      rootRef.current = createRoot(container);

      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position: { lat, lng },
        map,
        content: container,
      });
    }
    return () => {
      if (markerRef.current) markerRef.current = null;
    };
  }, [id, lat, lng, map]);

  useEffect(() => {
    if (rootRef.current && markerRef.current) {
      rootRef.current.render(
        <S.PinContainer>{id === 'CENTER' ? <LocatioinSpot /> : <Pin />}</S.PinContainer>,
      );

      markerRef.current.position = { lat, lng };
      markerRef.current.map = map;
    }
  }, [id, lat, lng, map]);

  return null;
};
export default MapMarker;

const LocatioinSpot = () => {
  return (
    <S.SpotWrapper>
      <S.SpotAnimation />
      <S.Spot />
    </S.SpotWrapper>
  );
};
