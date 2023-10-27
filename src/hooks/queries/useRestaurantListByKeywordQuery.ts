import { useQuery } from '@tanstack/react-query';

import { getRestaurantListByKeyword } from '@/apis/restaurant/getRestaurantListByKeyword';

import { RestaurantListByKeywordRequest } from '@/types/restaurant';

export const useRestaurantListByKeywordQuery = (paramData: RestaurantListByKeywordRequest) => {
  const { data, refetch } = useQuery({
    queryKey: ['restaurantListByKeyword'],
    queryFn: () => getRestaurantListByKeyword(paramData),
    enabled: false,
  });

  return {
    restaurantListByKeywordData: data!,
    refetch,
  };
};
