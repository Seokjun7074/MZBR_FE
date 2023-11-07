import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
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

export const VideoController = styled(Flex)`
  width: 100%;
  gap: 1rem;
`;

export const NextButton = styled(Button)`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  border: none;
  color: white;
  padding: 8px 40px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 80px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d65a28; // 색상을 조금 어둡게 변경
  }
`;
