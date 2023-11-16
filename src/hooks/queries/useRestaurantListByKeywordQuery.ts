import { useQuery } from '@tanstack/react-query';

import { getRestaurantListByKeyword } from '@/apis/restaurant/getRestaurantListByKeyword';

import { RestaurantListByKeywordRequest } from '@/types/restaurant';

export const useRestaurantListByKeywordQuery = (
  paramData: RestaurantListByKeywordRequest,
  placeType: string,
) => {
  const { data, isSuccess, refetch } = useQuery({
    queryKey: [
      'restaurantListByKeyword',
      paramData.bottomLat,
      paramData.bottomLng,
      paramData.topLat,
      paramData.topLng,
    ],
    queryFn: () => getRestaurantListByKeyword(paramData),
    enabled: false,
    // enabled: placeType === 'KEYWORD',
  });
  return {
    restaurantListByKeywordData: data!,
    isSuccess,
    restaurantListByKeywordRefetch: refetch,
  };
};
