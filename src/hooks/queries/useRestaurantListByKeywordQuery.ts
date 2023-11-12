import { useQuery } from '@tanstack/react-query';

import { getRestaurantListByKeyword } from '@/apis/restaurant/getRestaurantListByKeyword';

import { RestaurantListByKeywordRequest } from '@/types/restaurant';

export const useRestaurantListByKeywordQuery = (
  paramData: RestaurantListByKeywordRequest,
  placeType: string,
) => {
  const { data, isSuccess } = useQuery({
    queryKey: [
      'restaurantListByKeyword',
      paramData.bottomlat,
      paramData.bottomlng,
      paramData.toplat,
      paramData.toplng,
    ],
    queryFn: () => getRestaurantListByKeyword(paramData),
    enabled: placeType === 'KEYWORD',
  });
  return {
    restaurantListByKeywordData: data!,
    isSuccess,
  };
};
