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
  toplat: number;
  toplng: number;
  bottomlat: number;
  bottomlng: number;
}

export interface RestaurantListByKeywordRequest extends RestaurantListRequest {
  keyword: string;
  star: string;
  day: string;
  time: string;
}
export interface RestaurantListByHashTagRequest extends RestaurantListRequest {
  hashtag: string[];
  star: string;
  day: string;
  time: string;
}

export interface RestaurantDetailResponse {
  restaurantId: string;
  restaurant_name: string; // 식당 이름
  latitude: number; // 식당 위도
  longitude: number; // 식당 경도
  address: string; // 식당 주소
  star_count: number; // 별점
  operation_times: number[]; //운영시간
  hashTagList: string[]; // 해시태그 목록
}
