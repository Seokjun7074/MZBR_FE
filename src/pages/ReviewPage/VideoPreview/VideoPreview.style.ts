import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { Flex } from '@/components/common/Flex/Flex';

export const VideoPreviewWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 2em 0;
  justify-content: space-between;
`;

export const PreviewSection = styled(Flex)`
  width: 100%;
  padding: 0 2rem;
  gap: 1rem;
`;

export const PreviewHeaderText = styled.h1`
  color: ${({ theme }) => theme.color.primary};
  font-size: 24px;
  font-weight: bold;
`;

export const PreviewVideoContainer = styled(Flex)`
  height: 40rem;
  width: 100%;
  background-color: black;
  padding: 1rem;
`;

export const PreviewVideo = styled.video`
  width: auto;
  max-width: 48rem;
  height: 38rem;
  border-radius: 8px;
`;

export const ReviewTitleSubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.primary};
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #d65a28; // 색상을 조금 어둡게 변경
  }
`;
