import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

export const ReviewEditClipWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 2em;
  justify-content: space-between;
`;

export const EditHeader = styled.h1`
  color: ${({ theme }) => theme.color.primary};
  font-size: 24px;
  font-weight: bold;
`;

export const VideoTag = styled.video`
  width: 100%;
  background-color: whitesmoke;
  border-radius: 8px;
`;
