import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { axiosInstance } from '..';
import { getNewAccessToken } from '../getNewAccessToken';

const BASE_URL = 'http://localhost:3000';
const navigate = useNavigate();

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

const defaultVideos = [
  {
    id: 'uuid',
    thumbnail_url: 'sdsas',
  },
  {
    id: 'uuid',
    thumbnail_url: 'sdsas',
  },
];

const [videos, setVideos] = useState(defaultVideos);

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
      // const response = await axios.get<ApiResponse<videos[]>>(
      //   BASE_URL + `/videos/${user.userId}/likes`,
      //   {
      //     headers: { 'access-token': user.accessToken },
      //   },
      // );
      const response = await axiosInstance.get<ApiResponse<videos[]>>(
        `/videos/${user.userId}/likes`,
      );

      if (response.data.success) {
        setVideos(response.data.data);
      } else if (response.data.error && response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
        const newAccessToken = await getNewAccessToken(user.refreshToken);
        if (newAccessToken) {
          setUser({ ...user, accessToken: newAccessToken });

          // const newResponse = await axios.get<ApiResponse<videos[]>>(
          //   BASE_URL + `/videos/${user.userId}/likes`,
          //   {
          //     headers: { 'access-token': newAccessToken },
          //   },
          // );
          const newResponse = await axiosInstance.get<ApiResponse<videos[]>>(
            `/videos/${user.userId}/likes`,
          );

          if (newResponse.data.success) {
            setVideos(newResponse.data.data);
          } else {
          }
        } else {
        }
      }
    } catch (error) {}
  };

  if (user) {
    fetchVideos();
  }
}, [user, setUser, navigate]);
