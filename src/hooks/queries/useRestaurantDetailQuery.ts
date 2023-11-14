import { useQuery } from '@tanstack/react-query';

import { getRestaurantDetail } from '@/apis/restaurant/getRestaurantDetail';

export const useRestaurantDetailQuery = (storeId: string) => {
  const { data } = useQuery({
    queryKey: ['restaurantDetail', storeId],
    queryFn: () => getRestaurantDetail(storeId),
  });

  return { restaurantDetailData: data! };
};
