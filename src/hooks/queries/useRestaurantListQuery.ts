import { useQuery } from '@tanstack/react-query';

import { getRestaurantList } from '@/apis/restaurant/getRestaurantList';

import { RestaurantListRequest } from '@/types/restaurant';

export const useRestaurantListQuery = (paramData: RestaurantListRequest, placeType: string) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      'restaurantList',
      paramData.bottomLat,
      paramData.bottomLng,
      paramData.topLat,
      paramData.topLng,
    ],
    queryFn: () => getRestaurantList(paramData),
    enabled: placeType === 'POSITION',
  });
  return { restaurantListData: data!, isSuccess, isLoading };
};
