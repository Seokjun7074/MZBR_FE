import { useEffect, useRef, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { centerState } from '@/store/map';

export const useGoogleMap = (zoom: number) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const center = useRecoilValue(centerState);

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
      new google.maps.Marker({
        position: center,
        map,
      });
    }
  }, [center]);

  return { map, mapRef };
};
