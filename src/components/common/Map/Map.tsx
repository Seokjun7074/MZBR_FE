import { useEffect, useRef, useState } from 'react';

import MapMarker from '@/components/common/MapMarker/MapMarker';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

const Map = ({ center, zoom }: MapProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
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
        title: 'Hello World!',
      });
    }
  }, []);

  return (
    <div ref={mapRef} id="map" style={{ height: '100%', width: '100%' }}>
      {map && <MapMarker id="CENTER" lat={center.lat} lng={center.lng} map={map} />}
    </div>
  );
};

export default Map;
