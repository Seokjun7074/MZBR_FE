import React, { useState } from 'react';

import { useSubscribedUsers } from '@/apis/mypage/getMySubscribedUsers';

import Profile from '../../../assets/Profile.png';
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
  const [user, setUser] = useState<User>({
    userId: 1,
    accessToken: 'some_initial_access_token',
    refreshToken: 'some_initial_refresh_token',
  });

  const subscribes = useSubscribedUsers(user, setUser);

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
