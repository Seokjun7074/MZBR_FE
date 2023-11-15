import styled, { keyframes } from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

const loadingAnimation = keyframes`
  from {
    transform:scale(1,1)
  }
  50% {
    transform:scale(1,1.8)
  }
  to {
    transform:scale(1,1)
  }
`;

const LoadingBlock = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  flex-direction: column;
  gap: 3rem;
  color: ${({ theme }) => `${theme.color.darkgray};`};

  p {
    font-size: 1.7rem;
    font-weight: bold;
  }
`;

const Left = styled.div`
  border-radius: 2px;
  animation: ${loadingAnimation} 1s infinite ease-in-out;
  animation-delay: -0.16s;
`;

const Center = styled.div`
  border-radius: 2px;
  animation: ${loadingAnimation} 1s infinite ease-in-out;
`;

const Right = styled.div`
  border-radius: 2px;
  animation: ${loadingAnimation} 1s infinite ease-in-out;
  animation-delay: 0.16s;
`;

const SpinnerContainer = styled(Flex)`
  div {
    width: 0.8rem;
    height: 3rem;
    background-color: ${({ theme }) => `${theme.color.primary};`};
  }

  div:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Spinner = ({ message }: { message?: string }) => (
  <LoadingBlock role="alert" aria-label="로딩중입니다.">
    <SpinnerContainer>
      <Left />
      <Center />
      <Right />
    </SpinnerContainer>
    <p>{message}</p>
  </LoadingBlock>
);

export default Spinner;
