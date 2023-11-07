import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

export const VideoContainer = styled(Flex)`
  width: 100%;
  height: 30rem;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: black;
  gap: 1rem;
  padding: 1rem 0;
`;

export const VideoTag = styled.video`
  width: 80%;
  background-color: black;
  border-radius: 4px;
`;

export const VideoController = styled(Flex)`
  width: 100%;
  gap: 2rem;
  background-color: black;
`;
