import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

import { useUserInfoQuery } from '@/hooks/queries/useUserInfoQuery';

const UserInfo = ({ userId }: { userId: string }) => {
  const { userInfoData } = useUserInfoQuery(userId);

  return (
    <UserInfoWrapper>
      <UserNickNameSpan>{userInfoData?.nickname}</UserNickNameSpan>
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
