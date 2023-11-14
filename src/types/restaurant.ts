export interface Restaurant {
  storeId: string;
  storeName: string;
  latitude: number;
  longitude: number;
  address: string;
  star_count: number; // 별점
}

export interface RestaurantResponse {
  stores: Restaurant[];
}

export interface RestaurantListRequest {
  topLat: number;
  topLng: number;
  bottomLat: number;
  bottomLng: number;
}

export interface RestaurantListByKeywordRequest extends RestaurantListRequest {
  keyword: string;
  star: string;
}
export interface RestaurantListByHashTagRequest extends RestaurantListRequest {
  hashtag: string[];
  star: string;
}

export interface RestaurantDetailResponse {
  storeId: string;
  storeName: string; // 식당 이름
  latitude: number; // 식당 위도
  longitude: number; // 식당 경도
  address: string; // 식당 주소
  star_count: number; // 별점
  operation_times: number[]; //운영시간
  hashTagList: string[]; // 해시태그 목록
}
