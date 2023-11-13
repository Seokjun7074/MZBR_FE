import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { getNewAccessToken } from '../getNewAccessToken';

type User = {
  userId: number;
  accessToken: string;
  refreshToken: string;
};

const [user, setUser] = useState<User>({
  userId: 1,
  accessToken: 'some_initial_access_token',
  refreshToken: 'some_initial_refresh_token',
});

const defaultSubscribes = {
  userId: '1',
  profileImage: 'sad',
  nickname: 'sada',
};

type Subscribes = {
  userId: string;
  profileImage: string;
  nickname: string;
};

const [subscribes, setSubscribes] = useState<Subscribes>(defaultSubscribes);

const BASE_URL = 'http://localhost:3000';
const navigate = useNavigate();

useEffect(() => {
  const subscribesUser = async () => {
    try {
      const response = await axios.post(BASE_URL + `/users/subscribe/${subscribes.userId}`, {
        headers: { 'acces-token': user.accessToken },
      });
      if (response.data.success && response.data.data) {
        return response.data;
      } else if (response.data.error && response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
        const newAccessToken = await getNewAccessToken(user.refreshToken);
        if (newAccessToken) {
          setUser({ ...user, accessToken: newAccessToken });
          const newResponse = await axios.post(BASE_URL + `/users/subscribe/${subscribes.userId}`, {
            headers: { 'access-token': user.accessToken },
          });
          if (newResponse.data.success) {
            setUser({
              ...user,
            });
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
    subscribesUser();
  }
}, [user, setUser, navigate]);
