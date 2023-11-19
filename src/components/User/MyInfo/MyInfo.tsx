import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

import { useMyInfoQuery } from '@/hooks/queries/useMyInfoQuery';

const MyInfo = () => {
  const { myInfoData } = useMyInfoQuery();
  console.log(myInfoData);
  return (
    <MyInfoWrapper>
      <UserNickNameSpan>{myInfoData?.nickname}</UserNickNameSpan>
      <InfoContainer>
        <div>
          <span>게시글</span>
          {myInfoData?.postCount}개
        </div>
        <div>
          <span>팔로우</span>
          {myInfoData?.subscribeCount}명
        </div>
      </InfoContainer>
    </MyInfoWrapper>
  );
};

export default MyInfo;

const MyInfoWrapper = styled(Flex)`
  width: 100%;
  height: 10rem;
  background-color: aliceblue;
  justify-content: space-between;
  padding: 2rem;
`;

const UserNickNameSpan = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.color.darkgray};
`;

const InfoContainer = styled(Flex)`
  justify-content: space-evenly;
  width: 50%;
  font-weight: 500;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
`;
