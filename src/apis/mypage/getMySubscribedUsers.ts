import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { getNewAccessToken } from '../getNewAccessToken';

const BASE_URL = 'http://localhost:3000';
const navigate = useNavigate();
const defaultSubscribes = [
  {
    userId: '1',
    profileImage: 'sad',
    nickname: 'sada',
  },
  {
    userId: '2',
    profileImage: 'ssaad',
    nickname: 'saasdda',
  },
];

type User = {
  userId: number;
  accessToken: string;
  refreshToken: string;
};

const [subscribes, setSubscribes] = useState(defaultSubscribes);
const [user, setUser] = useState<User>({
  userId: 1,
  accessToken: 'some_initial_access_token',
  refreshToken: 'some_initial_refresh_token',
});

useEffect(() => {
  const fetchSubscribe = async () => {
    type subscribes = {
      userId: string;
      profileImage: string;
      nickname: string;
    };

    type ApiResponse<T> = {
      success: boolean;
      data: T;
      error?: string;
    };

    try {
      const response = await axios.get<ApiResponse<subscribes[]>>(BASE_URL + '/users/subscriber', {
        headers: { 'access-token': user.accessToken },
      });

      if (response.data.success) {
        setSubscribes(response.data.data);
      } else if (response.data.error && response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
        const newAccessToken = await getNewAccessToken(user.refreshToken);
        if (newAccessToken) {
          setUser({ ...user, accessToken: newAccessToken });

          const newResponse = await axios.get<ApiResponse<subscribes[]>>(
            BASE_URL + '/mypage/myvideo',
            {
              headers: { 'access-token': newAccessToken },
            },
          );

          if (newResponse.data.success) {
            setSubscribes(newResponse.data.data);
          } else {
            navigate('/error');
          }
        } else {
          navigate('/error');
        }
      }
    } catch (error) {
      navigate('/error');
    }
  };

  if (user) {
    fetchSubscribe();
  }
}, [user, setUser, navigate]);
