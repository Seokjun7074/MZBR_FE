import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import MapMarkerList from '@/components/Map/MapMarkerList/MapMarkerList';
import * as S from '@/components/Map/SearchMap/SearchMap.style';
import HashTagInput from '@/components/common/HashTagInput/HashTagInput';
import MapMarker from '@/components/common/MapMarker/MapMarker';

import { useRestaurantListByHashTagQuery } from '@/hooks/queries/useRestaurantListByHashTagQuery';
import { useRestaurantListByKeywordQuery } from '@/hooks/queries/useRestaurantListByKeywordQuery';
import { useRestaurantListQuery } from '@/hooks/queries/useRestaurantListQuery';
import { useGoogleMap } from '@/hooks/useGoogleMap';
import { useInput } from '@/hooks/useInput';

import { PATH } from '@/constants/path';

import Search from '@/assets/map/search_button.svg';
import ShortFormButton from '@/assets/navigationBar/shortform_button.svg';

import { centerState, mapBoundaryState, myPositionState } from '@/store/map';
import { Restaurant } from '@/types/restaurant';

interface SearchMapProps {
  center: google.maps.LatLngLiteral;
}

const SearchMap = ({ center }: SearchMapProps) => {
  const navigate = useNavigate();

  // const [isKeword, setIsKeyword] = useState(true);
  const [placeType, setPlaceType] = useState<'POSITION' | 'KEYWORD' | 'HASHTAG' | ''>('');
  const [restaurantList, setRestaurantList] = useState<Restaurant[] | []>([]);
  const { value, handleInput } = useInput('');

  const mapBoundary = useRecoilValue(mapBoundaryState);
  // const hashtagList = useRecoilValue(hashtagState);
  const myPosition = useRecoilValue(myPositionState);

  const { map, mapRef } = useGoogleMap(15, center);

  const boundary = {
    topLat: mapBoundary.topLat,
    topLng: mapBoundary.topLng,
    bottomLat: mapBoundary.bottomLat,
    bottomLng: mapBoundary.bottomLng,
  };

  // 식당 리스트 fetch
  const {
    restaurantListData,
    isSuccess: isSuccessPosition,
    restaurantListRefetch,
  } = useRestaurantListQuery(boundary, placeType);

  // 키워드 검색
  const {
    restaurantListByKeywordData,
    isSuccess: isSuccessKeyword,
    restaurantListByKeywordRefetch,
  } = useRestaurantListByKeywordQuery(
    {
      ...boundary,
      keyword: value,
    },
    placeType,
  );

  const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    searchKeyword();
  };

  useEffect(() => {
    if (isSuccessPosition) {
      setRestaurantList(restaurantListData?.stores);
    }
    if (isSuccessKeyword) {
      setRestaurantList(restaurantListByKeywordData?.stores);
    }
  }, [restaurantListData, restaurantListByKeywordData, isSuccessPosition, isSuccessKeyword]);

  const searchPosition = () => {
    restaurantListRefetch();
  };

  const searchKeyword = () => {
    if (value.length < 1) {
      alert('1글자 이상 입력해주세요!');
      return;
    }
    restaurantListByKeywordRefetch();
  };

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
      <S.SearchInputContainer>
        <S.SearchInput
          placeholder="검색어를 입력하세요"
          value={value}
          onChange={handleInput}
          onKeyDown={onKeydown}
        />
        <Search style={{ cursor: 'pointer' }} onClick={searchKeyword} />
      </S.SearchInputContainer>
      {/* <S.SearchCurrentPosition onClick={() => handleSearchType('POSITION')}> */}
      <S.SearchCurrentPosition onClick={searchPosition}>현재 위치에서 검색</S.SearchCurrentPosition>
      <S.FloatingButton>
        <ShortFormButton style={{ cursor: 'pointer' }} onClick={() => navigate(PATH.SHORT_FORM)} />
      </S.FloatingButton>
    </S.SearchMapWrapper>
  );
};

export default SearchMap;
