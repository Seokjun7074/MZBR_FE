import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { ApiResponse, SubscribedUser, User } from '../../pages/MyPage/Social/SubscribedUsers';
import { getNewAccessToken } from '../getNewAccessToken';

const BASE_URL = 'http://localhost:3000';
const navigate = useNavigate();

export const useSubscribedUsers = (
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
) => {
  const [subscribes, setSubscribes] = useState<SubscribedUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscribe = async () => {
      try {
        const response = await axios.get<ApiResponse<SubscribedUser[]>>(
          `${BASE_URL}/users/subscriber`,
          {
            headers: { 'access-token': user.accessToken },
          },
        );

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
