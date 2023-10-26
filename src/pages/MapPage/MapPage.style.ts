import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { Flex } from '@/components/common/Flex/Flex';

export const MapPageWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  .map-container {
    width: 100%;
    height: 100%;
  }
`;

export const MapPageNavigationBar = styled(Flex)`
  width: 100%;
  position: relative;
  height: 7rem;
  background-color: ${({ theme }) => theme.color.background};
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.2);
  justify-content: space-around;
`;
