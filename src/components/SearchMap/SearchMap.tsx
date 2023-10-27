import { useRecoilState } from 'recoil';

import * as S from '@/components/SearchMap/SearchMap.style';
import MapMarker from '@/components/common/MapMarker/MapMarker';

import { useGoogleMap } from '@/hooks/useGoogleMap';

import { centerState } from '@/store/map';

const SearchMap = () => {
  const { map, mapRef } = useGoogleMap(14);
  const [center, setCenter] = useRecoilState(centerState);

  const setCurrentCenter = () => {
    if (map) {
      const mapCenter = map.getCenter();
      setCenter({
        lat: mapCenter!.lat(),
        lng: mapCenter!.lng(),
      });
    }
  };

  return (
    <S.SearchMapWrapper>
      <div ref={mapRef} id="map" style={{ height: '100%', width: '100%' }}>
        {map && <MapMarker id="CENTER" lat={center.lat} lng={center.lng} map={map} />}
      </div>
      <S.SearchCurrentPosition onClick={setCurrentCenter}>
        현재 위치에서 검색
      </S.SearchCurrentPosition>
    </S.SearchMapWrapper>
  );
};

export default SearchMap;
