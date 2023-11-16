import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

export const HeaderWrapper = styled(Flex)<{ $isMap: boolean }>`
  height: 6rem;
  width: 100%;
  justify-content: ${({ $isMap }) => ($isMap ? 'end' : 'start')};

  svg {
    cursor: pointer;
  }
`;
