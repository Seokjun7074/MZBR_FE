import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

export const IntroPageWrapper = styled(Flex)`
  flex-direction: column;
  min-height: 100vh;
  min-width: 370px;
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0px 0px 5px 2px gray;
  background-color: ${({ theme }) => theme.color.primary};
  justify-content: space-around;
`;

export const LoginContainer = styled(Flex)`
  flex-direction: column;
  width: 70%;
`;

export const LoginImage = styled.img`
  width: 100%;
  cursor: pointer;
`;
