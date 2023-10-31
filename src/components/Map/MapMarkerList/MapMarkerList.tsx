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
  const [restaurantIdList, setRestaurantIdList] = useState<string[]>([]);

  const filterPlaceType = (placeType: string) => {
    if (placeType == 'POSITION') return restaurantListData;
    if (placeType == 'KEYWORD') return restaurantListByKeywordData;
    if (placeType == 'HASHTAG') return restaurantListByHashTagData;
  };
  useEffect(() => {
    const filteredList = filterPlaceType(placeType);
    const idList: string[] = [];

    const newMarkers = filteredList?.restaurants.map((item) => {
      idList.push(item.restaurantId);
      return {
        key: item.restaurantId,
        id: item.restaurantId,
        lat: item.latitude,
        lng: item.longitude,
      };
    });

    setRestaurantIdList([...idList]);
    setMarkers(newMarkers);
  }, [placeType, restaurantListData, restaurantListByKeywordData, restaurantListByHashTagData]);

  return (
    <>
      {markers?.map((item: MarkerType) => (
        <MapMarker key={item.id} id={item.id} lat={item.lat} lng={item.lng} map={map} />
      ))}
    </>
  );
};

export default MapMarkerList;
