import { useEffect } from 'react';

import * as S from '@/components/Map/RestaurantDetail/RestaurantDetail.style';

import { useRestaurantDetailQuery } from '@/hooks/queries/useRestaurantDetailQuery';

const RestaurantDetail = ({ id }: { id: string }) => {
  const { restaurantDetailData } = useRestaurantDetailQuery(id);
  console.log(restaurantDetailData);

  return (
    <S.RestaurantDetailWrapper>
      <S.RestaurantDetailHeader>
        <span>{restaurantDetailData?.restaurant_name}</span>
        <span>{restaurantDetailData?.star_count}</span>
      </S.RestaurantDetailHeader>
      <S.RestaurantDetailBody>
        <span>주소</span>
        <span>{restaurantDetailData?.address}</span>
      </S.RestaurantDetailBody>
      <S.RestaurantDetailBody>
        {restaurantDetailData?.hashTagList.map((item) => <span key={item}>{item}</span>)}
      </S.RestaurantDetailBody>
    </S.RestaurantDetailWrapper>
  );
};

export default RestaurantDetail;
