import { useEffect, useRef } from 'react';
import { Root, createRoot } from 'react-dom/client';

import * as S from '@/components/common/MapMarker/MapMarker.style';

import Pin from '@/assets/map/pin.svg';

export interface MapMarkerProps {
  id: string;
  lat: number;
  lng: number;
  map: google.maps.Map;
  openModal?: (id: string) => void;
}
const MapMarker = ({ id, lat, lng, map, openModal }: MapMarkerProps) => {
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
      if (id !== 'CENTER' && openModal) {
        markerRef.current.addListener('click', () => openModal(id));
      }
    }
    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
        if (openModal) markerRef.current.removeEventListener('click', () => openModal(id));
      }
    };
  }, [id, lat, lng, map]);

  useEffect(() => {
    if (rootRef.current && markerRef.current) {
      rootRef.current.render(
        <S.PinContainer>
          {id === 'CENTER' ? <LocatioinSpot /> : <Pin className={id} />}
        </S.PinContainer>,
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
