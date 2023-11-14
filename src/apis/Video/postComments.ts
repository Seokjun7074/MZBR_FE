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

type Comment = {
  commentId: number;
  content: string;
  userid: number;
};

const comments: Comment = {
  commentId: 1,
  content: 'sdasadsadsa',
  userid: 12,
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

const navigate = useNavigate();

useEffect(() => {
  const addComments = async () => {
    try {
      // const response = await axios.post(
      //   BASE_URL + `/videos/${video.videoUUID}/comments`,
      //   { content: comments.content },
      //   {
      //     headers: { 'access-token': user.accessToken },
      //   },
      // );
      const response = await axiosInstance.post(`/videos/${video.videoUUID}/comments`);

      if (response.data.success && response.data.data) {
        return response.data;
      } else if (response.data.error && response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
        const newAccessToken = await getNewAccessToken(user.refreshToken);
        if (newAccessToken) {
          setUser({ ...user, accessToken: newAccessToken });
          // const newResponse = await axios.post(
          //   BASE_URL + `/videos/${video.videoUUID}/comments`,
          //   { content: comments.content },
          //   {
          //     headers: { 'access-token': user.accessToken },
          //   },
          // );
          const newResponse = await axiosInstance.post(`/videos/${video.videoUUID}/comments`);
          if (newResponse.data.success) {
            setUser({
              ...user,
            });
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
    addComments();
  }
}, [user, setUser, navigate]);
