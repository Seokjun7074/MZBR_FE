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
  align-items: start;
  padding: 2rem;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
`;

export const ShotFormInfoHeader = styled(Flex)`
  width: 100%;
  height: 5rem;
  justify-content: space-between;
  align-items: end;
  font-weight: bold;

  h2 {
    cursor: pointer;
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.l};
    color: ${({ theme }) => theme.color.yellow};
  }
`;
