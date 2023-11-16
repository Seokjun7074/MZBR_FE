import { useEffect, useState } from 'react';

import { axiosInstance } from '..';
import { ApiResponse, SubscribedUser, User } from '../../pages/MyPage/Social/SubscribedUsers';

export const useSubscribedUsers = (userId: number) => {
  const [subscribes, setSubscribes] = useState<SubscribedUser[]>([]);

  useEffect(() => {
    const fetchSubscribe = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<SubscribedUser[]>>(
          `/api/b/users/subscriber/${userId}`,
        );

        if (response.data.success) {
          setSubscribes(response.data.data);
        }
      } catch (error) {}
    };

    fetchSubscribe();
  }, [userId]);

  return subscribes;
};
