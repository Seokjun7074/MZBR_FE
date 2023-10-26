import React, { useEffect, useRef, useState } from 'react';

import { useRecoilState } from 'recoil';

import { SearchCurrentPosition } from '@/components/common/Map/Map.style';
import MapMarker from '@/components/common/MapMarker/MapMarker';

import { centerState } from '@/store/map';

interface MapProps {
  zoom: number;
  children?: React.ReactNode;
}

const Map = ({ zoom, children }: MapProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useRecoilState(centerState);

  const mapRef = useRef<HTMLDivElement | null>(null);
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
  }, []);

  const setCurrentCenter = () => {
    if (map) {
      const mapCenter = map.getCenter();
      setCenter({
        lat: mapCenter!.lat(),
        lng: mapCenter!.lng(),
      });
    }
  };

  return (
    <>
      <div ref={mapRef} id="map" style={{ height: '100%', width: '100%' }}>
        {map && <MapMarker id="CENTER" lat={center.lat} lng={center.lng} map={map} />}
        {map && children}
      </div>
      <SearchCurrentPosition onClick={setCurrentCenter}>현재 위치에서 검색</SearchCurrentPosition>
    </>
  );
};

export default Map;
