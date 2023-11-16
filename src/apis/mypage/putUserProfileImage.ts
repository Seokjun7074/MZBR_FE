import { useEffect, useState } from 'react';

import axios from 'axios';

import { User } from '../../pages/MyPage/EditProfile';
import { getNewAccessToken } from '../getNewAccessToken';

export const useProfileImageUpdater = (
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [updateResult, setUpdateResult] = useState({ success: false, profileImage: '' });

  useEffect(() => {
    const updateProfileImage = async () => {
      if (!profileImage) return;

      const formData = new FormData();
      formData.append('profileImage', profileImage);
      const BASE_URL = 'https://api.mzbr.co.kr';

      try {
        const response = await axios.put(`${BASE_URL}/api/b/user/profile-image`, formData, {
          headers: {
            'access-token': user.accessToken,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          setUser({ ...user, profileImage: response.data.data.profileImage });
          setUpdateResult({ success: true, profileImage: response.data.data.profileImage });
        } else {
          setUpdateResult({ success: false, profileImage: '' });
        }
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.data.error === 'JWT_TOKEN_EXPIRED_EXCEPTION'
        ) {
          const newAccessToken = await getNewAccessToken(user.refreshToken);
          if (newAccessToken) {
            setUser({ ...user, accessToken: newAccessToken });
            updateProfileImage(); // Retry with the new access token
          } else {
            console.error('Failed to refresh token');
            setUpdateResult({ success: false, profileImage: '' });
          }
        } else {
          console.error(error);
          setUpdateResult({ success: false, profileImage: '' });
        }
      }
    };

    updateProfileImage();
  }, [profileImage, user, setUser]);

  return { setProfileImage, updateResult };
};
