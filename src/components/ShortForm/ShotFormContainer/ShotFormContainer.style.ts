import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

export const ShotFormContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
  padding: 5rem;
  position: relative;
`;

export const ShotFormInfoContainer = styled(Flex)`
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0 5rem;
  color: white;
`;
