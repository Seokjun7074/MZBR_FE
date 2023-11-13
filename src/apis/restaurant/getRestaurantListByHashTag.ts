import qs from 'qs';

import { axiosInstance } from '@/apis';
import { RestaurantListByHashTagRequest, RestaurantResponse } from '@/types/restaurant';

export const getRestaurantListByHashTag = async ({
  hashtag,
  toplat,
  toplng,
  bottomlat,
  bottomlng,
  star,
  day,
  time,
}: RestaurantListByHashTagRequest) => {
  const { data } = await axiosInstance.get<RestaurantResponse>('/restaurants/search/hashtag', {
    params: {
      hashtag,
      toplat,
      toplng,
      bottomlat,
      bottomlng,
      star,
      day,
      time,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });

  return data;
};
