import { useEffect, useState } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import MapMarkerList from '@/components/Map/MapMarkerList/MapMarkerList';
import * as S from '@/components/Map/SearchMap/SearchMap.style';
import HashTagInput from '@/components/common/HashTagInput/HashTagInput';
import MapMarker from '@/components/common/MapMarker/MapMarker';

import { useRestaurantListByHashTagQuery } from '@/hooks/queries/useRestaurantListByHashTagQuery';
import { useRestaurantListByKeywordQuery } from '@/hooks/queries/useRestaurantListByKeywordQuery';
import { useRestaurantListQuery } from '@/hooks/queries/useRestaurantListQuery';
import { useGoogleMap } from '@/hooks/useGoogleMap';
import { useInput } from '@/hooks/useInput';

import Search from '@/assets/map/search_button.svg';

import { hashtagState } from '@/store/hashtag';
import { centerState, mapBoundaryState, myPositionState } from '@/store/map';
import { Restaurant } from '@/types/restaurant';

const SearchMap = () => {
  const [isKeword, setIsKeyword] = useState(true);
  const [placeType, setPlaceType] = useState<'POSITION' | 'KEYWORD' | 'HASHTAG' | ''>('');
  const [restaurantList, setRestaurantList] = useState<Restaurant[] | []>([]);
  const { map, mapRef } = useGoogleMap(15);
  const { value, handleInput } = useInput('');

  const setCenter = useSetRecoilState(centerState);
  const mapBoundary = useRecoilValue(mapBoundaryState);
  const hashtagList = useRecoilValue(hashtagState);
  const myPosition = useRecoilValue(myPositionState);

  const boundary = {
    topLat: mapBoundary.topLat,
    topLng: mapBoundary.topLng,
    bottomLat: mapBoundary.bottomLat,
    bottomLng: mapBoundary.bottomLng,
  };

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
  // 해시태그 검색
  const { restaurantListByHashTagData, isSuccess: isSuccessHashTag } =
    useRestaurantListByHashTagQuery(
      {
        ...boundary,
        hashtag: hashtagList,
        star: '',
      },
      placeType,
    );

  const setCurrentCenter = () => {
    if (map) {
      const mapCenter = map.getCenter();
      setCenter({
        lat: mapCenter!.lat(),
        lng: mapCenter!.lng(),
      });
    }
  };

  const handleSearchType = (placeType: 'POSITION' | 'KEYWORD' | 'HASHTAG') => {
    setCurrentCenter();
    setPlaceType(placeType);
  };

  useEffect(() => {
    if (placeType === 'POSITION' && isSuccessPosition) setRestaurantList(restaurantListData.stores);
    if (placeType === 'KEYWORD' && isSuccessKeyword)
      setRestaurantList(restaurantListByKeywordData.stores);
    if (placeType === 'HASHTAG' && isSuccessHashTag)
      setRestaurantList(restaurantListByHashTagData.stores);
  }, [placeType, restaurantListData, restaurantListByKeywordData, restaurantListByHashTagData]);

  return (
    <S.SearchMapWrapper>
      <div id="map" ref={mapRef} style={{ height: '100%', width: '100%' }}>
        {map && myPosition && (
          <>
            <MapMarker id="CENTER" lat={myPosition.lat} lng={myPosition.lng} map={map} />
            <MapMarkerList map={map} restaurantList={restaurantList} />
          </>
        )}
      </div>
      {isKeword ? (
        <S.SearchInputContainer>
          <S.SearchChangeButton onClick={() => setIsKeyword(false)}>해시태그</S.SearchChangeButton>
          <S.SearchInput placeholder="검색어를 입력하세요" value={value} onChange={handleInput} />
          <Search style={{ cursor: 'pointer' }} onClick={() => handleSearchType('KEYWORD')} />
        </S.SearchInputContainer>
      ) : (
        <S.HashTagInputContainer>
          <S.SearchChangeButton onClick={() => setIsKeyword(true)}>키워드</S.SearchChangeButton>
          <HashTagInput />
          <Search
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={() => handleSearchType('HASHTAG')}
          />
        </S.HashTagInputContainer>
      )}
      <S.SearchCurrentPosition onClick={() => handleSearchType('POSITION')}>
        현재 위치에서 검색
      </S.SearchCurrentPosition>
    </S.SearchMapWrapper>
  );
};

export default SearchMap;
