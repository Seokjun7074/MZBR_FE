import { useRecoilState } from 'recoil';

import * as S from '@/components/SearchMap/SearchMap.style';
import MapMarker from '@/components/common/MapMarker/MapMarker';

import { useRestaurantListByKeywordQuery } from '@/hooks/queries/useRestaurantListByKeywordQuery';
import { useRestaurantListQuery } from '@/hooks/queries/useRestaurantListQuery';
import { useGoogleMap } from '@/hooks/useGoogleMap';
import { useInput } from '@/hooks/useInput';

import Search from '@/assets/map/search_button.svg';

import { centerState } from '@/store/map';

const SearchMap = () => {
  const { map, mapRef } = useGoogleMap(14);
  const [center, setCenter] = useRecoilState(centerState);
  const { value, handleInput } = useInput('');

  // 식당 리스트 fetch
  const { restaurantListData } = useRestaurantListQuery({
    latitude: center.lat,
    longitude: center.lng,
    radius: 5,
  });

  // 키워드 검색
  const { restaurantListByKeywordData, refetch } = useRestaurantListByKeywordQuery({
    latitude: center.lat,
    longitude: center.lng,
    radius: 5,
    keyword: value,
    day: '',
    star: '',
    time: '',
  });

  const setCurrentCenter = () => {
    if (map) {
      const mapCenter = map.getCenter();
      setCenter({
        lat: mapCenter!.lat(),
        lng: mapCenter!.lng(),
      });
    }
  };

  const searchByKeyword = () => {
    setCurrentCenter();
    refetch();
  };

  return (
    <S.SearchMapWrapper>
      <div id="map" ref={mapRef} style={{ height: '100%', width: '100%' }}>
        {map && <MapMarker id="CENTER" lat={center.lat} lng={center.lng} map={map} />}
      </div>
      <S.SearchInputContainer>
        <S.SearchInput placeholder="검색어를 입력하세요" value={value} onChange={handleInput} />
        <Search style={{ cursor: 'pointer' }} onClick={searchByKeyword} />
      </S.SearchInputContainer>
      <S.SearchCurrentPosition onClick={setCurrentCenter}>
        현재 위치에서 검색
      </S.SearchCurrentPosition>
    </S.SearchMapWrapper>
  );
};

export default SearchMap;
