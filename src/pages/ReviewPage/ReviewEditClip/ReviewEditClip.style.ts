import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { Flex } from '@/components/common/Flex/Flex';

export const ReviewEditClipWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 2em 0;
  justify-content: space-between;
`;

export const EditHeader = styled.h1`
  color: ${({ theme }) => theme.color.primary};
  font-size: 24px;
  font-weight: bold;
`;

export const VideoContainer = styled(Flex)`
  width: 100%;
  height: 30rem;
  flex-direction: column;
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

export const NextButton = styled(Button)`
  width: calc(100% - 4rem);
  background-color: ${({ theme }) => theme.color.primary};
  border: none;
  color: white;
  padding: 8px 40px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d65a28; // 색상을 조금 어둡게 변경
  }
`;
