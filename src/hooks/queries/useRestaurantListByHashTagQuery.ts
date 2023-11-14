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
      paramData.bottomLat,
      paramData.bottomLng,
      paramData.topLat,
      paramData.topLng,
    ],
    queryFn: () => getRestaurantListByHashTag(paramData),
    enabled: placeType === 'HASHTAG',
  });
  return {
    restaurantListByHashTagData: data!,
    isSuccess,
  };
};
