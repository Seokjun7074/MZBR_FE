import { useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import MapMarkerList from '@/components/Map/MapMarkerList/MapMarkerList';
import * as S from '@/components/Map/SearchMap/SearchMap.style';
import HashTagInput from '@/components/common/HashTagInput/HashTagInput';

import { useRestaurantListByHashTagQuery } from '@/hooks/queries/useRestaurantListByHashTagQuery';
import { useRestaurantListByKeywordQuery } from '@/hooks/queries/useRestaurantListByKeywordQuery';
import { useRestaurantListQuery } from '@/hooks/queries/useRestaurantListQuery';
import { useGoogleMap } from '@/hooks/useGoogleMap';
import { useInput } from '@/hooks/useInput';

import Search from '@/assets/map/search_button.svg';

import { hashtagState } from '@/store/hashtag';
import { centerState, mapBoundaryState } from '@/store/map';

const SearchMap = () => {
  const [isKeword, setIsKeyword] = useState(true);
  const [placeType, setPlaceType] = useState<'POSITION' | 'KEYWORD' | 'HASHTAG'>('POSITION');
  const { map, mapRef } = useGoogleMap(15);
  const [center, setCenter] = useRecoilState(centerState);
  const mapBoundary = useRecoilValue(mapBoundaryState);
  const { value, handleInput } = useInput('');
  const hashtagList = useRecoilValue(hashtagState);

  // 식당 리스트 fetch
  const { restaurantListData } = useRestaurantListQuery({
    toplat: mapBoundary.toplat,
    toplng: mapBoundary.toplng,
    bottomlat: mapBoundary.bottomlat,
    bottomlng: mapBoundary.bottomlng,
  });

  // 키워드 검색
  const { restaurantListByKeywordData, refetch: refetchKeyword } = useRestaurantListByKeywordQuery({
    toplat: mapBoundary.toplat,
    toplng: mapBoundary.toplng,
    bottomlat: mapBoundary.bottomlat,
    bottomlng: mapBoundary.bottomlng,
    keyword: value,
    day: '',
    star: '',
    time: '',
  });
  // 해시태그 검색
  const { restaurantListByHashTagData, refetch: refetchHastTag } = useRestaurantListByHashTagQuery({
    toplat: mapBoundary.toplat,
    toplng: mapBoundary.toplng,
    bottomlat: mapBoundary.bottomlat,
    bottomlng: mapBoundary.bottomlng,
    hashtag: hashtagList,
    day: '',
    star: '',
    time: '',
  });

  const setCurrentCenter = () => {
    if (map) {
      console.log('set Center');
      const mapCenter = map.getCenter();
      setCenter({
        lat: mapCenter!.lat(),
        lng: mapCenter!.lng(),
      });
    }
  };

  const searchByPosition = () => {
    setCurrentCenter();
    setPlaceType('POSITION');
  };

  const searchByKeyword = () => {
    setCurrentCenter();
    setPlaceType('KEYWORD');
    refetchKeyword();
  };
  const searchByHashTag = () => {
    setCurrentCenter();
    setPlaceType('HASHTAG');
    refetchHastTag();
  };

  return (
    <S.SearchMapWrapper>
      <div id="map" ref={mapRef} style={{ height: '100%', width: '100%' }}>
        {map && (
          <MapMarkerList
            map={map}
            restaurantListData={restaurantListData}
            restaurantListByKeywordData={restaurantListByKeywordData}
            restaurantListByHashTagData={restaurantListByHashTagData}
            placeType={placeType}
          />
        )}
      </div>
      {isKeword ? (
        <S.SearchInputContainer>
          <S.SearchChangeButton onClick={() => setIsKeyword(false)}>해시태그</S.SearchChangeButton>
          <S.SearchInput placeholder="검색어를 입력하세요" value={value} onChange={handleInput} />
          <Search style={{ cursor: 'pointer' }} onClick={searchByKeyword} />
        </S.SearchInputContainer>
      ) : (
        <S.HashTagInputContainer>
          <S.SearchChangeButton onClick={() => setIsKeyword(true)}>키워드</S.SearchChangeButton>
          <HashTagInput />
          <Search style={{ cursor: 'pointer', position: 'relative' }} onClick={searchByHashTag} />
        </S.HashTagInputContainer>
      )}
      <S.SearchCurrentPosition onClick={searchByPosition}>
        현재 위치에서 검색
      </S.SearchCurrentPosition>
    </S.SearchMapWrapper>
  );
};

export default SearchMap;
