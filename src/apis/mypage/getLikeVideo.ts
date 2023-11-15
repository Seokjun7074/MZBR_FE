import { useEffect, useState } from 'react';

import { axiosInstance } from '..';
import { ApiResponse, User, Video } from '../../pages/MyPage/Video/LikeVideo';

export const useLikedVideos = (userId: number) => {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<Video[]>>(`/videos/${userId}/likes`);

        if (response.data.success) {
          setVideos(response.data.data);
        }
      } catch (error) {}
    };

    fetchVideos();
  }, [userId]);

  return videos;
};
