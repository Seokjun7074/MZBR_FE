import { useEffect, useState } from 'react';

import { axiosInstance } from '..';
import { ApiResponse, UserProfile } from '../../pages/MyPage/User';

export const useUserProfile = (userId: number) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // null로 초기화

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<UserProfile>>(`/api/b/user/${userId}`);
        if (response.data.success) {
          setUserProfile(response.data.data);
        }
      } catch (error) {
        console.error('UserProfile 가져오기 실패:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return userProfile;
};
