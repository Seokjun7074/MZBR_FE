import { useEffect, useState } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

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

  useEffect(() => {
    if (placeType === 'POSITION' && isSuccessPosition) setRestaurantList(restaurantListData.stores);
    if (placeType === 'KEYWORD' && isSuccessKeyword)
      setRestaurantList(restaurantListByKeywordData.stores);
  }, [placeType, restaurantListData, restaurantListByKeywordData]);

  return (
    <>
      <div id="map" ref={mapRef} style={{ height: '60%', width: '100%' }}></div>
      <input type="text" value={value} onChange={handleInput} />
    </>
  );
};

export default RestaurantMap;
