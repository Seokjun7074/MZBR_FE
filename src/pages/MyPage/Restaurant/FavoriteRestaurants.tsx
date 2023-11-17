import { useFavoriteRestaurants } from '@/apis/mypage/getFavoriteRestaurant';

import { axiosInstance } from '@/apis';

import { Container, RestaurantItem, Title, UnfavoriteButton } from './FavoriteRestaurant.style';

export type Restaurant = {
  RestaurantId: number;
  phone_number: string;
  restaurant_name: string;
  address: string;
  thumbnail: string;
};

export interface User {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const FavoriteRestaurants = () => {
  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId ? parseInt(storedUserId, 10) : 1;

  const restaurants = useFavoriteRestaurants(userId);

  const handleRestaurnat = async () => {
    try {
      const response = await axiosInstance.post(`/api/b/users/restaurant/${userId}`);

      if (response.data.success) {
      } else {
        console.log('즐겨찾기 추가 실패:', response.data.error);
      }
    } catch (error) {
      console.error('즐겨찾기 중 오류 발생:', error);
    }
  };
  return (
    <Container>
      <Title>즐겨찾기 식당</Title>
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.RestaurantId}>
          <img src={restaurant.thumbnail} alt={restaurant.restaurant_name} />
          <div>
            <h4>{restaurant.restaurant_name}</h4>
            <span>{restaurant.address}</span>
          </div>
          <UnfavoriteButton onClick={handleRestaurnat}>즐겨찾기 취소</UnfavoriteButton>
        </RestaurantItem>
      ))}
    </Container>
  );
};

export default FavoriteRestaurants;
