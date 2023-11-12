import { useEffect, useState } from 'react';

import MapMarker from '@/components/common/MapMarker/MapMarker';

import { Restaurant } from '@/types/restaurant';

interface MapMarkerListProps {
  map: google.maps.Map;
  restaurantList: Restaurant[] | [];
}
interface MarkerType {
  key: string;
  id: string;
  lat: number;
  lng: number;
}

const MapMarkerList = ({ map, restaurantList }: MapMarkerListProps) => {
  const [markers, setMarkers] = useState<MarkerType[] | undefined>([]);

  useEffect(() => {
    if (restaurantList?.length! > 0) {
      const bounds = new google.maps.LatLngBounds();
      restaurantList.forEach((item: Restaurant) =>
        bounds.extend(new google.maps.LatLng(item.latitude, item.longitude)),
      );
      const boundCenter = bounds.getCenter();
      map.panTo(boundCenter);
      map.fitBounds(bounds);
    }

    const newMarkers = restaurantList.map((item: Restaurant) => ({
      key: item.restaurantId,
      id: item.restaurantId,
      lat: item.latitude,
      lng: item.longitude,
    }));

    setMarkers(newMarkers);
  }, [restaurantList]);

  return (
    <>
      {markers?.map((item: MarkerType) => (
        <MapMarker key={item.id} id={item.id} lat={item.lat} lng={item.lng} map={map} />
      ))}
    </>
  );
};

export default MapMarkerList;
