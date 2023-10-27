export interface Restaurant {
  restaurantId: string;
  restaurant_name: string;
  latitude: number;
  longitude: number;
  address: string;
  star_count: number; // 별점
  operation_times: number[];
}

export interface RestaurantResponse {
  restaurants: Restaurant[];
}

export interface RestaurantListRequest {
  latitude: number;
  longitude: number;
  radius: number;
}

export interface RestaurantListByKeywordRequest extends RestaurantListRequest {
  keyword: string;
  star: string;
  day: string;
  time: string;
}
