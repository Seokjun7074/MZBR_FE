import { useQuery } from '@tanstack/react-query';

import { getRestaurantList } from '@/apis/restaurant/getRestaurantList';

import { RestaurantListRequest } from '@/types/restaurant';

export const useRestaurantListQuery = (paramData: RestaurantListRequest) => {
  const { data } = useQuery({
    queryKey: ['restaurantList', paramData.latitude, paramData.longitude, paramData.radius],
    queryFn: () => getRestaurantList(paramData),
  });
  return { restaurantListData: data! };
};
