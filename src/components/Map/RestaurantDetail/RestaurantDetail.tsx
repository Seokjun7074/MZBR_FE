import { useNavigate } from 'react-router-dom';

import * as S from '@/components/Map/RestaurantDetail/RestaurantDetail.style';

import { PATH } from '@/constants/path';

import { Restaurant } from '@/types/restaurant';

interface RestaurantDetailProps {
  id: string;
  selectedRestaurant: Restaurant;
}

const RestaurantDetail = ({ id, selectedRestaurant }: RestaurantDetailProps) => {
  const navigate = useNavigate();

  const replaceColon = (text: string) => {
    return text.replaceAll('"', '');
  };

  return (
    <S.RestaurantDetailWrapper>
      <S.RestaurantDetailHeader>
        <span>🍴 {selectedRestaurant?.storeName}</span>
        {selectedRestaurant?.star_count ? <span>★{selectedRestaurant?.star_count}</span> : <></>}
      </S.RestaurantDetailHeader>
      <S.RestaurantDetailBody>
        <span>{replaceColon(selectedRestaurant?.address)}</span>
      </S.RestaurantDetailBody>
      <S.ReviewButton onClick={() => navigate(PATH.REVIEW(id))}>
        ✏️ 맛집 후기 작성하기
      </S.ReviewButton>
    </S.RestaurantDetailWrapper>
  );
};

export default RestaurantDetail;
