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

const MapMarkerList = ({ map, restaurantList }: MapMarkerListProps) => {
  const [selectedMarker, setSelectedMarker] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (restaurantList?.length! <= 0) return;

    const bounds = new google.maps.LatLngBounds();
    restaurantList.forEach((item: Restaurant) =>
      bounds.extend(new google.maps.LatLng(item.latitude, item.longitude)),
    );
    const boundCenter = bounds.getCenter();
    map.panTo(boundCenter);
    map.fitBounds(bounds);

    return () => {
      closeModal();
    };
  }, [restaurantList]);

  const selectMarker = (id: string) => {
    setSelectedMarker(id);
    const selectedData = restaurantList.find((store) => store.storeId === id);
    setSelectedRestaurant(selectedData!);
    openModal();
  };

  return (
    <>
      {restaurantList?.map((item: Restaurant) => (
        <MapMarker
          key={item.storeId}
          id={item.storeId}
          lat={item.latitude}
          lng={item.longitude}
          map={map}
          openModal={selectMarker}
        />
      ))}
      <Modal>
        <RestaurantDetail id={selectedMarker} selectedRestaurant={selectedRestaurant!} />
      </Modal>
    </>
  );
};

export default MapMarkerList;
