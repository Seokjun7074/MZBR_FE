import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

export const VideoPreviewWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 2em 0;
  justify-content: space-between;
`;

export const PreviewVideoContainer = styled(Flex)`
  max-height: 40rem;
  width: 100%;
  background-color: black;
  padding: 1rem 0;
`;

export const PreviewVideo = styled.video`
  width: auto;
  height: 100%;
  border-radius: 8px;
`;
