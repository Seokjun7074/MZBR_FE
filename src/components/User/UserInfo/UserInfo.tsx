import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

import { useSubscribeMutation } from '@/hooks/mutations/useSubscribeMutation';
import { useUserInfoQuery } from '@/hooks/queries/useUserInfoQuery';

const UserInfo = ({ userId }: { userId: string }) => {
  const { userInfoData } = useUserInfoQuery(userId);
  const subscribeMutation = useSubscribeMutation();

  const handleFollow = () => {
    subscribeMutation.mutate(userId);
  };

  return (
    <UserInfoWrapper>
      <div>
        <UserNickNameSpan>{userInfoData?.nickname} </UserNickNameSpan>
        <FollowButton onClick={handleFollow}>+팔로우</FollowButton>
      </div>
      <InfoContainer>
        <div>
          <span>게시글</span>
          {userInfoData?.postCount}개
        </div>
        <div>
          <span>팔로우</span>
          {userInfoData?.subscribeCount}명
        </div>
      </InfoContainer>
    </UserInfoWrapper>
  );
};

export default UserInfo;

const UserInfoWrapper = styled(Flex)`
  width: 100%;
  height: 10rem;
  border-bottom: 2px solid ${({ theme }) => theme.color.gray};
  justify-content: space-between;
  padding: 2rem;
`;

const UserNickNameSpan = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.color.darkgray};
`;

const InfoContainer = styled(Flex)`
  justify-content: space-between;
  width: 40%;
  font-weight: 500;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
`;

const FollowButton = styled.button`
  width: 6rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.color.primary};
  font-weight: 500;
`;
