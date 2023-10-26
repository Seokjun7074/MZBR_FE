import { useQuery } from '@tanstack/react-query';

import { getRestaurantList, getRestaurantListRequest } from '@/apis/restaurant/getRestaurantList';

export const useRestaurantListQuery = (paramData: getRestaurantListRequest) => {
  const { data } = useQuery({
    queryKey: ['restaurantList', paramData.latitude, paramData.longitude, paramData.radius],
    queryFn: () => getRestaurantList(paramData),
  });
  return { restaurantListData: data! };
};
