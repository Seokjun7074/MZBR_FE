import { HttpResponse, http } from 'msw';

export const restaurantDetailHandler = [
  http.get('/restaurants/:storeId', ({ params }) => {
    const { storeId } = params;
    return HttpResponse.json({
      storeId: storeId,
      storeName: '털보네 김치찌개', // 식당 이름
      latitude: 126.3423525, // 식당 위도
      longitude: 37.5115164, // 식당 경도
      address: '서울특별시 강남구 테헤란로 12', // 식당 주소
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
      hashTagList: ['태그1', '태그2'],
    });
  }),
];
