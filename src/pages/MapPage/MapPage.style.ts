import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

export const MapPageWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  .map-container {
    width: 100%;
    height: 100%;
  }
  position: relative;
`;

export const FloatingButton = styled(Flex)`
  position: absolute;
  bottom: 5rem;
  right: 2.5rem;
  flex-direction: column;
  border-radius: 50%;
  background-color: white;
  padding: 1rem;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
`;
