import { useQuery } from '@tanstack/react-query';

import { getRestaurantVideoList } from '@/apis/shortForm/getRestaurantVideoList';

export const useRestaurantVideoListQuery = (restaurantId: string) => {
  const { data } = useQuery({
    queryKey: ['restaurantVideoList'],
    queryFn: () => getRestaurantVideoList(restaurantId),
  });

  return {
    restaurantVideoListData: data!,
  };
};
