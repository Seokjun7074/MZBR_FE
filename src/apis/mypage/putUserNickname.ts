import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { getNewAccessToken } from '../getNewAccessToken';

type User = {
  userId: number;
  nickname: string;
  accessToken: string;
  refreshToken: string;
};

const [user, setUser] = useState<User>({
  userId: 1,
  nickname: 'coco',
  accessToken: 'some_initial_access_token',
  refreshToken: 'some_initial_refresh_token',
});
const BASE_URL = 'http://localhost:3000';
const newNickname = 'haha';
const navigate = useNavigate();

useEffect(() => {
  const changeAndHandleNickname = async () => {
    try {
      const response = await axios.put(
        BASE_URL + '/users/nickname',
        { nickname: newNickname },
        { headers: { 'access-token': user.accessToken } },
      );

      if (response.data.success && response.data.data) {
        setUser({
          ...user,
          nickname: response.data.data,
        });
      } else if (response.data.error && response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
        const newAccessToken = await getNewAccessToken(user.refreshToken);
        if (newAccessToken) {
          setUser({ ...user, accessToken: newAccessToken });
          const newResponse = await axios.put(
            '/users/nickname',
            { nickname: newNickname },
            { headers: { 'access-token': user.accessToken } },
          );
          if (newResponse.data.success) {
            setUser({
              ...user,
              nickname: response.data.data,
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
    changeAndHandleNickname();
  }
}, [user, setUser, navigate]);
