import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { Flex } from '@/components/common/Flex/Flex';

export const VideoTextWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
`;

export const VideoContainer = styled(Flex)`
  width: 100%;
  height: 40rem;
  flex-direction: column;
  background-color: black;
  border-radius: 8px;
`;

export const VideoTextOverlay = styled(Flex)`
  position: relative;
`;

export const VideoTag = styled.video`
  width: auto;
  height: 40rem;
  background-color: black;
`;

export const TextInput = styled.input`
  width: 20rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.lightgray};
  color: ${({ theme }) => theme.color.darkgray};
  font-weight: bold;
  border-radius: 8px;
`;

export const VideoTextButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.primary};
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover {
    background-color: #d65a28; // 색상을 조금 어둡게 변경
  }
`;
