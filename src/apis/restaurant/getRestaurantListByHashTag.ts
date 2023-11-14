import qs from 'qs';

import { axiosInstance } from '@/apis';
import { RestaurantListByHashTagRequest, RestaurantResponse } from '@/types/restaurant';

export const getRestaurantListByHashTag = async ({
  hashtag,
  topLat,
  topLng,
  bottomLat,
  bottomLng,
  star,
}: RestaurantListByHashTagRequest) => {
  const { data } = await axiosInstance.get<RestaurantResponse>(
    '/api/b/restaurants/search/hashtag',
    {
      params: {
        hashtag,
        topLat,
        topLng,
        bottomLat,
        bottomLng,
        star,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    },
  );

  return data;
};
