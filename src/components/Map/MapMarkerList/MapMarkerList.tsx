import { useEffect, useState } from 'react';

import RestaurantDetail from '@/components/Map/RestaurantDetail/RestaurantDetail';
import MapMarker from '@/components/common/MapMarker/MapMarker';
import Modal from '@/components/common/Modal/Modal';

import useModal from '@/hooks/useModal';

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
  const [selectedMarker, setSelectedMarker] = useState('');
  const { openModal } = useModal();

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
      key: item.storeId,
      id: item.storeId,
      lat: item.latitude,
      lng: item.longitude,
    }));

    setMarkers(newMarkers);
  }, [restaurantList]);

  const selectMarker = (id: string) => {
    setSelectedMarker(id);
    openModal();
  };

  return (
    <>
      {markers?.map((item: MarkerType) => (
        <div
          key={item.id}
          style={{ zIndex: '100', width: '100px', height: '100px', backgroundColor: 'red' }}
        >
          <MapMarker
            key={item.id}
            id={item.id}
            lat={item.lat}
            lng={item.lng}
            map={map}
            openModal={selectMarker}
          />
        </div>
      ))}
      <Modal>
        <RestaurantDetail id={selectedMarker} />
      </Modal>
    </>
  );
};

export default MapMarkerList;
