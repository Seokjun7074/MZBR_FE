// hooks/useMyVideos.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { ApiResponse, User, Video } from '../../pages/MyPage/Video/MyVideo';
import { getNewAccessToken } from '../getNewAccessToken';

const BASE_URL = 'http://localhost:3000';

export const useMyVideos = (
  userId: number,
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  navigate: ReturnType<typeof useNavigate>,
) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<ApiResponse<Video[]>>(
          `${BASE_URL}/videos/users/${userId}`,
          {
            headers: { 'access-token': user.accessToken },
          },
        );

        if (response.data.success) {
          setVideos(response.data.data);
        } else if (response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
          const newAccessToken = await getNewAccessToken(user.refreshToken);
          if (newAccessToken) {
            setUser((prev) => ({ ...prev, accessToken: newAccessToken }));
            fetchVideos(); // Retry with the new access token
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, [userId, user, setUser, navigate]);

  return videos;
};
