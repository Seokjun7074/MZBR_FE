import { useEffect, useState } from 'react';

import { axiosInstance } from '..';
import { ApiResponse, Restaurant } from '../../pages/MyPage/Restaurant/FavoriteRestaurants';

export const useFavoriteRestaurants = (userId: number) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<Restaurant[]>>(
          `/api//b/favorite/restaurants/${userId}`,
        );

        if (response.data.success) {
          setRestaurants(response.data.data);
        }
      } catch (error) {}
    };

    fetchVideos();
  }, [userId]);

  return restaurants;
};
