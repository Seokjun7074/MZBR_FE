import { useEffect, useState } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import MapMarkerList from '@/components/Map/MapMarkerList/MapMarkerList';
import MapMarker from '@/components/common/MapMarker/MapMarker';

import { useRestaurantListByKeywordQuery } from '@/hooks/queries/useRestaurantListByKeywordQuery';
import { useRestaurantListQuery } from '@/hooks/queries/useRestaurantListQuery';
import { useGoogleMap } from '@/hooks/useGoogleMap';
import { useInput } from '@/hooks/useInput';

import { centerState, mapBoundaryState } from '@/store/map';
import { Restaurant } from '@/types/restaurant';

const RestaurantMap = () => {
  const { map, mapRef } = useGoogleMap(15);
  const { value, handleInput } = useInput('');

  const [restaurantList, setRestaurantList] = useState<Restaurant[] | []>([]);
  const [placeType, setPlaceType] = useState<'POSITION' | 'KEYWORD' | ''>('POSITION');

  const setCenter = useSetRecoilState(centerState);
  const mapBoundary = useRecoilValue(mapBoundaryState);

  const boundary = {
    topLat: mapBoundary.topLat,
    topLng: mapBoundary.topLng,
    bottomLat: mapBoundary.bottomLat,
    bottomLng: mapBoundary.bottomLng,
  };
  console.log(boundary);
  // 식당 리스트 fetch
  const { restaurantListData, isSuccess: isSuccessPosition } = useRestaurantListQuery(
    boundary,
    placeType,
  );

  // 키워드 검색
  const { restaurantListByKeywordData, isSuccess: isSuccessKeyword } =
    useRestaurantListByKeywordQuery(
      {
        ...boundary,
        keyword: value,
        star: '',
      },
      placeType,
    );

  const handleSearchType = (placeType: 'POSITION' | 'KEYWORD') => {
    setCurrentCenter();
    setPlaceType(placeType);
  };

  const setCurrentCenter = () => {
    if (map) {
      const mapCenter = map.getCenter();
      setCenter({
        lat: mapCenter!.lat(),
        lng: mapCenter!.lng(),
      });
    }
  };

  useEffect(() => {
    if (placeType === 'POSITION' && isSuccessPosition) setRestaurantList(restaurantListData.stores);
    if (placeType === 'KEYWORD' && isSuccessKeyword)
      setRestaurantList(restaurantListByKeywordData.stores);
  }, [placeType, restaurantListData, restaurantListByKeywordData]);

  return (
    <>
      <span>리뷰를 작성할 장소를 찾아주세요!</span>
      <div id="map" ref={mapRef} style={{ height: '60%', width: '100%' }}>
        {map && (
          <>
            <MapMarkerList map={map} restaurantList={restaurantList} />
          </>
        )}
      </div>
      <input type="text" value={value} onChange={handleInput} />
      <button onClick={() => handleSearchType('KEYWORD')}>검색</button>
    </>
  );
};

export default RestaurantMap;
