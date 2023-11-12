import { useQuery } from '@tanstack/react-query';

import { getRestaurantListByHashTag } from '@/apis/restaurant/getRestaurantListByHashTag';

import { RestaurantListByHashTagRequest } from '@/types/restaurant';

export const useRestaurantListByHashTagQuery = (paramData: RestaurantListByHashTagRequest) => {
  const { data, refetch } = useQuery({
    queryKey: [
      'restaurantListByHashTag',
      paramData.bottomlat,
      paramData.bottomlng,
      paramData.toplat,
      paramData.toplng,
    ],
    queryFn: () => getRestaurantListByHashTag(paramData),
    enabled: false,
  });

  return {
    restaurantListByHashTagData: data!,
    refetch,
  };
};
