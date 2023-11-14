import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { axiosInstance } from '..';
import { getNewAccessToken } from '../getNewAccessToken';

const BASE_URL = 'http://localhost:3000';

type User = {
  userId: number;
  accessToken: string;
  refreshToken: string;
};

type Video = {
  videoId: number;
  videoUUID: string;
};
const video: Video = {
  videoId: 1,
  videoUUID: 'SADS',
};

const [user, setUser] = useState<User>({
  userId: 1,
  accessToken: 'initial_access_token',
  refreshToken: 'initial_refresh_token',
});

const videoUUID = 1;
const [comments, setComments] = useState([]);

useEffect(() => {
  const fetchComments = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/videos/${videoUUID}/comments`, {
      //   headers: { Authorization: `Bearer ${user.accessToken}` },
      // });

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
