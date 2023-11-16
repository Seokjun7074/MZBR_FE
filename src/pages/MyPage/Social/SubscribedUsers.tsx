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

  return (
    <Container>
      <Header>구독중인 사용자 목록</Header>
      {subscribes.map((subscribe: SubscribedUser) => (
        <UserItem key={subscribe.userId}>
          <img src={subscribe.profileImage} alt={subscribe.nickname} />
          <span>{subscribe.nickname}</span>
          <Button>구독취소</Button>
        </UserItem>
      ))}
    </Container>
  );
};

export default SubscribedUsers;
