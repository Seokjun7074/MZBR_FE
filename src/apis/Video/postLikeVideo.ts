import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { getNewAccessToken } from '../getNewAccessToken';

type Video = {
  videoId: number;
  UUID: string;
};

const video: Video = {
  videoId: 1,
  UUID: 'SADS',
};

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

const BASE_URL = 'http://localhost:3000';
const navigate = useNavigate();
useEffect(() => {
  const likeVideo = async () => {
    try {
      const response = await axios.post(BASE_URL + `/videos/${video.UUID}/like`, {
        headers: { 'access-token': user.accessToken },
      });
      if (response.data.success && response.data.data) {
        return response.data;
      } else if (response.data.error && response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
        const newAccessToken = await getNewAccessToken(user.refreshToken);
        if (newAccessToken) {
          setUser({ ...user, accessToken: newAccessToken });
          const newResponse = await axios.post(BASE_URL + `/videos/${video.UUID}/like`, {
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
    likeVideo();
  }
}, [user, setUser, navigate]);
