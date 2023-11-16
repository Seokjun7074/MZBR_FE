import { useEffect, useState } from 'react';

import { axiosInstance } from '..';
import { ApiResponse, User, Video } from '../../pages/MyPage/Video/MyVideo';

export const useMyVideos = (userId: number) => {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<Video[]>>(
          `/api/b/videos/users/${userId}`,
        );

        if (response.data.success) {
          setVideos(response.data.data);
        }
      } catch (error) {}
    };

    fetchVideos();
  }, [userId]);

  return videos;
};
