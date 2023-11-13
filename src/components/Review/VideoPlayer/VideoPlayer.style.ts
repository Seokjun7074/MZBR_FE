import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

export const VideoContainer = styled(Flex)`
  width: 100%;
  height: 35rem;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: black;
  gap: 1rem;
  padding: 1rem 0;
`;

export const VideoOverlay = styled(Flex)`
  width: 100%;
  position: relative;
`;

export const VideoTag = styled.video`
  max-width: 100%;
  max-height: 30rem;
  background-color: black;
`;

export const VideoController = styled(Flex)`
  width: 100%;
  height: 3rem;
  gap: 2rem;
  background-color: black;
`;
