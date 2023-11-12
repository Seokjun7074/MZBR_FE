import { useEffect, useRef, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { centerState, mapBoundaryState } from '@/store/map';

export const useGoogleMap = (zoom: number) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const center = useRecoilValue(centerState);
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

  useEffect(() => {
    if (!map) return;

    map.setCenter(center);
    const bounds = map.getBounds();
    if (bounds) {
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      setMapBoundary({
        toplat: ne.lat(),
        toplng: ne.lng(),
        bottomlat: sw.lat(),
        bottomlng: sw.lng(),
      });
    }
  }, [center]);

  return { map, mapRef };
};
