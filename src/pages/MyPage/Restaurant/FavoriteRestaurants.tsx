import Profile from '../../../assets/Profile.png';
import { Container, RestaurantItem, Title, UnfavoriteButton } from './FavoriteRestaurant.style';

type Restaurant = {
  storeId: number;
  phone_number: string;
  storeName: string;
  address: string;
  thumbnail: string;
};

const DUMMY_RESTAURANTS: Restaurant[] = [
  {
    storeId: 1,
    phone_number: '010-1234-5678',
    storeName: 'Restaurant A',
    address: '123 Main St, City A',
    thumbnail: Profile,
  },
  {
    storeId: 2,
    phone_number: '010-8765-4321',
    storeName: 'Restaurant B',
    address: '456 Elm St, City B',
    thumbnail: Profile,
  },
  {
    storeId: 3,
    phone_number: '010-8765-4321',
    storeName: 'Restaurant B',
    address: '456 Elm St, City B',
    thumbnail: Profile,
  },
  {
    storeId: 4,
    phone_number: '010-8765-4321',
    storeName: 'Restaurant B',
    address: '456 Elm St, City B',
    thumbnail: Profile,
  },
  {
    storeId: 5,
    phone_number: '010-8765-4321',
    storeName: 'Restaurant B',
    address: '456 Elm St, City B',
    thumbnail: Profile,
  },
  {
    storeId: 6,
    phone_number: '010-8765-4321',
    storeName: 'Restaurant B',
    address: '456 Elm St, City B',
    thumbnail: Profile,
  },
  {
    storeId: 7,
    phone_number: '010-8765-4321',
    storeName: 'Restaurant B',
    address: '456 Elm St, City B',
    thumbnail: Profile,
  },
  {
    storeId: 8,
    phone_number: '010-8765-4321',
    storeName: 'Restaurant B',
    address: '456 Elm St, City B',
    thumbnail: Profile,
  },
];

const FavoriteRestaurants = () => {
  return (
    <Container>
      <Title>즐겨찾기 식당</Title>
      {DUMMY_RESTAURANTS.map((restaurant) => (
        <RestaurantItem key={restaurant.storeId}>
          <img src={restaurant.thumbnail} alt={restaurant.storeName} />
          <div>
            <h4>{restaurant.storeName}</h4>
            <span>{restaurant.address}</span>
          </div>
          <UnfavoriteButton>즐겨찾기 취소</UnfavoriteButton>
        </RestaurantItem>
      ))}
    </Container>
  );
};

export default FavoriteRestaurants;
