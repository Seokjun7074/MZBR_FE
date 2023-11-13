import { useQuery } from '@tanstack/react-query';

import { getRestaurantDetail } from '@/apis/restaurant/getRestaurantDetail';

export const useRestaurantDetailQuery = (restaurantId: string) => {
  const { data } = useQuery({
    queryKey: ['restaurantDetail', restaurantId],
    queryFn: () => getRestaurantDetail(restaurantId),
  });

  return { restaurantDetailData: data! };
};
