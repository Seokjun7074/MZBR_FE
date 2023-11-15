import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosInstance } from '..';
import { ApiResponse, SubscribedUser, User } from '../../pages/MyPage/Social/SubscribedUsers';
import { getNewAccessToken } from '../getNewAccessToken';

export const useSubscribedUsers = (
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  navigate: ReturnType<typeof useNavigate>,
) => {
  const [subscribes, setSubscribes] = useState<SubscribedUser[]>([]);

  useEffect(() => {
    const fetchSubscribe = async () => {
      try {
        const response =
          await axiosInstance.get<ApiResponse<SubscribedUser[]>>('/users/subscriber');

        if (response.data.success) {
          setSubscribes(response.data.data);
        } else if (response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
          const newAccessToken = await getNewAccessToken(user.refreshToken);
          if (newAccessToken) {
            setUser((prev) => ({ ...prev, accessToken: newAccessToken }));
            // Retry the request with the new access token
          } else {
            navigate('/error');
          }
        }
      } catch (error) {
        navigate('/error');
      }
    };

    fetchSubscribe();
  }, [user, setUser, navigate]);

  return subscribes;
};
