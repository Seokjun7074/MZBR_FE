// hooks/useUserProfile.ts
import { useEffect } from 'react';

import axios from 'axios';

import { ApiResponse, User, UserProfile } from '../../pages/MyPage/User';
import { getNewAccessToken } from '../getNewAccessToken';

const BASE_URL = 'http://localhost:3000';

export const useUserProfile = (
  userId: number,
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>,
) => {
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<ApiResponse<UserProfile>>(`${BASE_URL}/user/${userId}`, {
          headers: { 'access-token': user.accessToken },
        });

        if (response.data.success) {
          setUserProfile(response.data.data);
        } else if (response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION') {
          const newAccessToken = await getNewAccessToken(user.refreshToken);
          if (newAccessToken) {
            setUser((prev) => ({ ...prev, accessToken: newAccessToken }));
            fetchUserProfile(); // Retry with the new access token
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [userId, user, setUser, setUserProfile]);
};
