import { useEffect, useState } from 'react';

import axios from 'axios';

import { Profile } from '../../assets/Profile.png';
import { getNewAccessToken } from '../getNewAccessToken';

type User = {
  userId: number;
  profileImage: String;
  accessToken: string;
  refreshToken: string;
};

const [user, setUser] = useState<User>({
  userId: 1,
  profileImage: Profile,
  accessToken: 'some_initial_access_token',
  refreshToken: 'some_initial_refresh_token',
});

const [profileImage, setProfileImage] = useState<File | null>(null);
const BASE_URL = 'http://localhost:3000';

useEffect(() => {
  const updateProfileImage = async (): Promise<{ profileImage?: string; success: boolean }> => {
    if (!profileImage) return { success: false };

    const formData = new FormData();
    formData.append('profileImage', profileImage);

    try {
      const response = await axios.put(BASE_URL + '/user/profile-image', formData, {
        headers: {
          'access-token': user.accessToken,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setUser({ ...user, profileImage: response.data.data.profileImage });
        return { success: true, profileImage: response.data.data.profileImage };
      } else {
        return { success: false };
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION'
      ) {
        const newAccessToken = await getNewAccessToken(user.refreshToken);
        if (newAccessToken) {
          setUser({ ...user, accessToken: newAccessToken });
          return updateProfileImage(); // Retry with the new access token
        } else {
          console.error('Failed to refresh token');
          return { success: false };
        }
      } else {
        console.error(error);
        return { success: false };
      }
    }
  };

  updateProfileImage();
}, [profileImage, user]);
