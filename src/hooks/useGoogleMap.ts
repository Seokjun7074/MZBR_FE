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

      const idleListener = mapInfo.addListener('idle', () => {
        const bounds = mapInfo.getBounds();
        if (bounds) {
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          console.log('NorthEast:', ne.lat(), ne.lng());
          console.log('SouthWest:', sw.lat(), sw.lng());

          setMapBoundary({
            toplat: ne.lat(),
            toplng: ne.lng(),
            bottomlat: sw.lat(),
            bottomlng: sw.lng(),
          });
        }
      });

      setMap(mapInfo);

      return () => {
        if (idleListener) {
          google.maps.event.removeListener(idleListener);
        }
      };
    }
  }, [center]);

  return { map, mapRef };
};
