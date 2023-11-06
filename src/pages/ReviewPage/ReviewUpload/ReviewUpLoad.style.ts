// UpLoad.style.ts
import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { Flex } from '@/components/common/Flex/Flex';

export const ReviewUpLoadContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 2em;
  justify-content: space-between;
`;

export const Heading = styled.h1`
  color: ${({ theme }) => theme.color.primary};
  font-size: 24px;
  font-weight: bold;
`;

export const UpLoadBox = styled(Flex)`
  flex-direction: column;
  width: 400px;
  height: 150px;
  background-color: #ebebeb;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
  text-align: center;
  margin-bottom: 40px;
`;

export const VideoInput = styled.input`
  display: none;
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

export const Image = styled.img`
  width: 50px; // 원하는 너비로 설정
  height: auto; // 비율 유지를 위해 auto로 설정
  max-width: 100%; // 부모 요소를 벗어나지 않도록 설정
`;

export const ImageCaption = styled.span`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;
