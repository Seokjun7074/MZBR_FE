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
`;

export const PreviewHeaderText = styled.h1`
  color: ${({ theme }) => theme.color.primary};
  font-size: 24px;
  font-weight: bold;
`;

export const PreviewVideoContainer = styled(Flex)`
  max-height: 40rem;
  width: 100%;
`;

export const PreviewVideo = styled.video`
  width: auto;
  height: 100%;
  border-radius: 8px;
`;

export const ReviewTitleSubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.primary};
  border: none;
  color: white;
  padding: 8px 40px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 80px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d65a28; // 색상을 조금 어둡게 변경
  }
`;
