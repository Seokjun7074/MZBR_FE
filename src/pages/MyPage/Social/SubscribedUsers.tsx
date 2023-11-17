import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSubscribedUsers } from '@/apis/mypage/getMySubscribedUsers';

import { axiosInstance } from '../../../apis/index';
import { Button, Container, Header, UserItem } from './SubscribedUsers.style';

export interface User {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface SubscribedUser {
  userId: string;
  profileImage: string;
  nickname: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const SubscribedUsers = () => {
  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId ? parseInt(storedUserId, 10) : 1;
  const subscribes = useSubscribedUsers(userId);
  const handleUnsubscribe = async (unsubscribeUserId: string) => {
    try {
      const response = await axiosInstance.post(`/api/b/users/subscribe/${unsubscribeUserId}`);
      if (response.data.success) {
        // 여기에서 구독자 목록 업데이트 로직을 추가할 수 있습니다.
        console.log('구독 취소 성공');
      } else {
        console.error('구독 취소 실패:', response.data.error);
      }
    } catch (error) {
      console.error('구독 취소 중 오류 발생:', error);
    }
  };
  return (
    <Container>
      <Header>구독중인 사용자 목록</Header>
      {subscribes.map((subscribe: SubscribedUser) => (
        <UserItem key={subscribe.userId}>
          <img src={subscribe.profileImage} alt={subscribe.nickname} />
          <span>{subscribe.nickname}</span>
          <Button onClick={() => handleUnsubscribe(subscribe.userId)}>구독취소</Button>
        </UserItem>
      ))}
    </Container>
  );
};

export default SubscribedUsers;
