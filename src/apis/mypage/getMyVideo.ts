import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { ApiResponse, User, Video } from '../../pages/MyPage/Video/MyVideo';
import { getNewAccessToken } from '../getNewAccessToken';

const BASE_URL = 'http://localhost:3000';
const navigate = useNavigate();

export const useMyVideos = (user: User, setUser: React.Dispatch<React.SetStateAction<User>>) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<ApiResponse<Video[]>>(
          `${BASE_URL}/videos/users/${user.userId}`,
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
            // Retry the request with the new access token
          } else {
            navigate('/error');
          }
        }
      } catch (error) {
        navigate('/error');
      }
    };

    fetchVideos();
  }, [user, setUser, navigate]);

  return videos;
};
