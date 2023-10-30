import MapMarker from '@/components/common/MapMarker/MapMarker';

import { Restaurant, RestaurantResponse } from '@/types/restaurant';

interface MapMarkerListProps {
  map: google.maps.Map;
  restaurantListData: RestaurantResponse;
  restaurantListByKeywordData: RestaurantResponse;
  restaurantListByHashTagData: RestaurantResponse;
  placeType: string;
}

const MapMarkerList = ({
  map,
  placeType,
  restaurantListData,
  restaurantListByKeywordData,
  restaurantListByHashTagData,
}: MapMarkerListProps) => {
  const filterPlaceType = (placeType: string) => {
    if (placeType == 'POSITION') return restaurantListData;
    if (placeType == 'KEYWORD') return restaurantListByKeywordData;
    if (placeType == 'HASHTAG') return restaurantListByHashTagData;
  };
  return (
    <>
      {filterPlaceType(placeType)?.restaurants.map((item: Restaurant) => (
        <MapMarker
          key={item.restaurantId}
          id={item.restaurantId}
          lat={item.latitude}
          lng={item.longitude}
          map={map}
        />
      ))}
    </>
  );
};

export default MapMarkerList;
