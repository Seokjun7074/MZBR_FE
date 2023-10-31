import { HttpResponse, http } from 'msw';

const restaurantDummy1 = {
  restaurants: [
    {
      restaurantId: '1',
      restaurant_name: '털보네', // 식당 이름
      latitude: 37.5099054, // 식당 위도
      longitude: 127.0317466, // 식당 경도
      address: '서울특별시 강남구 테헤란로 112', // 식당 주소
      star_count: 4.73, // 별점
      operation_times: [
        0, // 휴무
        1241,
        315,
        121,
        111,
        111,
        111,
      ],
    },
    {
      restaurantId: '2',
      restaurant_name: '김치찌개', // 식당 이름
      latitude: 37.5196054, // 식당 위도
      longitude: 127.0217466, // 식당 경도
      address: '서울특별시 강남구 테헤란로 123', // 식당 주소
      star_count: 4.13, // 별점
      operation_times: [
        0, // 휴무
        1241,
        315,
        121,
        111,
        111,
        111,
      ],
    },
  ],
};
const restaurantDummy2 = {
  restaurants: [
    {
      restaurantId: '3',
      restaurant_name: '털보네', // 식당 이름
      latitude: 37.5199054, // 식당 위도
      longitude: 127.0317466, // 식당 경도
      address: '서울특별시 강남구 테헤란로 112', // 식당 주소
      star_count: 4.73, // 별점
      operation_times: [
        0, // 휴무
        1241,
        315,
        121,
        111,
        111,
        111,
      ],
    },
    {
      restaurantId: '4',
      restaurant_name: '김치찌개', // 식당 이름
      latitude: 37.5126054, // 식당 위도
      longitude: 127.0217466, // 식당 경도
      address: '서울특별시 강남구 테헤란로 123', // 식당 주소
      star_count: 4.13, // 별점
      operation_times: [
        0, // 휴무
        1241,
        315,
        121,
        111,
        111,
        111,
      ],
    },
  ],
};
const restaurantDummy3 = {
  restaurants: [
    {
      restaurantId: '5',
      restaurant_name: '털보네', // 식당 이름
      latitude: 37.5129054, // 식당 위도
      longitude: 127.0317466, // 식당 경도
      address: '서울특별시 강남구 테헤란로 112', // 식당 주소
      star_count: 4.73, // 별점
      operation_times: [
        0, // 휴무
        1241,
        315,
        121,
        111,
        111,
        111,
      ],
    },
    {
      restaurantId: '6',
      restaurant_name: '김치찌개', // 식당 이름
      latitude: 37.5126054, // 식당 위도
      longitude: 127.0237466, // 식당 경도
      address: '서울특별시 강남구 테헤란로 123', // 식당 주소
      star_count: 4.13, // 별점
      operation_times: [
        0, // 휴무
        1241,
        315,
        121,
        111,
        111,
        111,
      ],
    },
  ],
};

export const restaurantHandler = [
  http.get('/restaurants', () => {
    return HttpResponse.json(restaurantDummy1);
  }),
  http.get('/restaurants/search', () => {
    return HttpResponse.json(restaurantDummy2);
  }),
  http.get('/restaurants/search/hashtag', () => {
    return HttpResponse.json(restaurantDummy3);
  }),
];
