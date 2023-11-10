import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { getNewAccessToken } from '../getNewAccessToken';

const BASE_URL = 'http://localhost:3000';
const navigate = useNavigate();
const defaultMyVideos = [
  {
    id: '1',
    thumbnail_url: 'asdasdasdas',
  },
  {
    id: '2',
    thumbnail_url: 'asdasadsdasdas',
  },
];
type User = {
  userId: number;
  accessToken: string;
  refreshToken: string;
};

const [videos, setVideos] = useState(defaultMyVideos);
const [user, setUser] = useState<User>({
  userId: 1,
  accessToken: 'some_initial_access_token',
  refreshToken: 'some_initial_refresh_token',
});

useEffect(() => {
  const fetchVideos = async () => {
    type videos = {
      id: string;
      thumbnail_url: string;
    };

    type ApiResponse<T> = {
      success: boolean;
      data: T;
      error?: string;
    };

    try {
      const response = await axios.get<ApiResponse<videos[]>>(
        BASE_URL + `/videos/users/${user.userId}`,
        {
          headers: { 'access-token': user.accessToken },
        },
      );

      if (response.data.success) {
        setVideos(response.data.data);
      } else if (response.data.error && response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
        const newAccessToken = await getNewAccessToken(user.refreshToken);
        if (newAccessToken) {
          setUser({ ...user, accessToken: newAccessToken });

          const newResponse = await axios.get<ApiResponse<videos[]>>(BASE_URL + '/mypage/myvideo', {
            headers: { 'access-token': newAccessToken },
          });

          if (newResponse.data.success) {
            setVideos(newResponse.data.data);
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
    fetchVideos();
  }
}, [user, setUser, navigate]);
