import { useEffect, useState } from 'react';

import MapMarker from '@/components/common/MapMarker/MapMarker';

import { RestaurantResponse } from '@/types/restaurant';

interface MapMarkerListProps {
  map: google.maps.Map;
  restaurantListData: RestaurantResponse;
  restaurantListByKeywordData: RestaurantResponse;
  restaurantListByHashTagData: RestaurantResponse;
  placeType: string;
}
interface MarkerType {
  key: string;
  id: string;
  lat: number;
  lng: number;
}

const MapMarkerList = ({
  map,
  placeType,
  restaurantListData,
  restaurantListByKeywordData,
  restaurantListByHashTagData,
}: MapMarkerListProps) => {
  const [markers, setMarkers] = useState<MarkerType[] | undefined>([]);

  const filterPlaceType = (placeType: string) => {
    if (placeType == 'POSITION') return restaurantListData;
    if (placeType == 'KEYWORD') return restaurantListByKeywordData;
    if (placeType == 'HASHTAG') return restaurantListByHashTagData;
  };
  useEffect(() => {
    const filteredList = filterPlaceType(placeType);
    if (filteredList?.restaurants?.length! > 0) {
      const bounds = new google.maps.LatLngBounds();
      filteredList?.restaurants?.forEach((item) =>
        bounds.extend(new google.maps.LatLng(item.latitude, item.longitude)),
      );
      const center = bounds.getCenter();
      map.panTo(center);
      map.fitBounds(bounds);
    }
    const newMarkers = filteredList?.restaurants.map((item) => {
      return {
        key: item.restaurantId,
        id: item.restaurantId,
        lat: item.latitude,
        lng: item.longitude,
      };
    });
    setMarkers(newMarkers);
  }, [placeType, restaurantListData, restaurantListByKeywordData, restaurantListByHashTagData]);
  console.log(markers);
  return (
    <>
      {markers?.map((item: MarkerType) => (
        <MapMarker key={item.id} id={item.id} lat={item.lat} lng={item.lng} map={map} />
      ))}
    </>
  );
};

export default MapMarkerList;
