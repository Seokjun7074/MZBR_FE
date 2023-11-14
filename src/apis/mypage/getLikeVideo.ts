import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosInstance } from '..';
import { ApiResponse, User, Video } from '../../pages/MyPage/Video/LikeVideo';
import { getNewAccessToken } from '../getNewAccessToken';

export const useLikedVideos = (user: User, setUser: React.Dispatch<React.SetStateAction<User>>) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // const response = await axios.get<ApiResponse<Video[]>>(
        //   `${BASE_URL}/videos/${user.userId}/likes`,
        //   {
        //     headers: { 'access-token': user.accessToken },
        //   },
        // );

        const response = await axiosInstance.get<ApiResponse<Video[]>>(
          `$/videos/${user.userId}/likes`,
        );

        if (response.data.success) {
          setVideos(response.data.data);
        } else if (response.data.error && response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
          const newAccessToken = await getNewAccessToken(user.refreshToken);
          if (newAccessToken) {
            setUser((prev) => ({ ...prev, accessToken: newAccessToken }));
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

  return videos;
};
