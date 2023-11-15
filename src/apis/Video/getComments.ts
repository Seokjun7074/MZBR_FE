import { useEffect, useState } from 'react';

import { axiosInstance } from '..';

type User = {
  userId: number;
  accessToken: string;
  refreshToken: string;
};

type Video = {
  videoId: number;
  videoUUID: string;
};

const videoUUID = 1;
const [comments, setComments] = useState([]);

useEffect(() => {
  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/videos/${videoUUID}/comments`);

      if (response.data && response.data.commentsList) {
        setComments(response.data.commentsList);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  fetchComments();
}, []);
