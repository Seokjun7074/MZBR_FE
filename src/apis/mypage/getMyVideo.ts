import { useEffect, useState } from 'react';

import { axiosInstance } from '..';
import { ApiResponse, User, Video } from '../../pages/MyPage/Video/MyVideo';
import { getNewAccessToken } from '../getNewAccessToken';

export const useMyVideos = (user: User, setUser: React.Dispatch<React.SetStateAction<User>>) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // const response = await axios.get<ApiResponse<Video[]>>(
        //   `${BASE_URL}/videos/users/${user.userId}`,
        //   {
        //     headers: { 'access-token': user.accessToken },
        //   },
        // );

        const response = await axiosInstance.get<ApiResponse<Video[]>>(
          `/videos/users/${user.userId}`,
        );

        if (response.data.success) {
          setVideos(response.data.data);
        } else if (response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
          const newAccessToken = await getNewAccessToken(user.refreshToken);
          if (newAccessToken) {
            setUser((prev) => ({ ...prev, accessToken: newAccessToken }));
          } else {
          }
        }
      } catch (error) {}
    };

    fetchVideos();
  }, [user, setUser]);

  return videos;
};
