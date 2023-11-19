import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

export const UserVideoPageWrapper = styled(Flex)`
  height: 100%;
  width: 100%;
  flex-direction: column;
  gap: 3rem;
  padding: 0 2rem;
  justify-content: start;
`;

export const ThumbnailContainer = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
`;

export const PlayerContainer = styled(Flex)`
  width: 100%;
  padding: 1rem;
  background-color: black;
  overflow: hidden;
  border-radius: 8px;
`;
