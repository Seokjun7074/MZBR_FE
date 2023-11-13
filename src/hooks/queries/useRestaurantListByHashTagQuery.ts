import { useQuery } from '@tanstack/react-query';

import { getRestaurantListByHashTag } from '@/apis/restaurant/getRestaurantListByHashTag';

import { RestaurantListByHashTagRequest } from '@/types/restaurant';

export const useRestaurantListByHashTagQuery = (
  paramData: RestaurantListByHashTagRequest,
  placeType: string,
) => {
  const { data, isSuccess } = useQuery({
    queryKey: [
      'restaurantListByHashTag',
      paramData.bottomlat,
      paramData.bottomlng,
      paramData.toplat,
      paramData.toplng,
    ],
    queryFn: () => getRestaurantListByHashTag(paramData),
    enabled: placeType === 'HASHTAG',
  });
  return {
    restaurantListByHashTagData: data!,
    isSuccess,
  };
};
