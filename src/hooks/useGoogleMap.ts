import { useEffect, useRef, useState } from 'react';

import { useRecoilState } from 'recoil';

import { mapBoundaryState } from '@/store/map';

interface Center {
  lat: number;
  lng: number;
}
export const useGoogleMap = (zoom: number, center: Center) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapBoundary, setMapBoundary] = useRecoilState(mapBoundaryState);

  useEffect(() => {
    if (mapRef.current) {
      const mapInfo = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        clickableIcons: false,
        disableDefaultUI: true,
        mapId: 'MAIN_PAGE_MAP',
      });
      setMap(mapInfo);
    }
  }, []);

  const getMapBoundary = () => {
    if (!map) return;
    const bounds = map.getBounds();
    if (bounds) {
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      setMapBoundary({
        topLat: ne.lat(),
        topLng: ne.lng(),
        bottomLat: sw.lat(),
        bottomLng: sw.lng(),
      });
    }
  };

  useEffect(() => {
    map?.setCenter(center);
    getMapBoundary();
  }, [center]);

  useEffect(() => {
    map?.addListener('bounds_changed', getMapBoundary);
  }, [map]);

  return { map, mapRef };
};
