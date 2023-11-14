import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { Flex } from '@/components/common/Flex/Flex';

export const ReviewTitleWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 2em;
  justify-content: space-between;
`;

export const ReviewTitleHeaderText = styled.h1`
  color: ${({ theme }) => theme.color.primary};
  font-size: 24px;
  font-weight: bold;
`;

export const LabelContainer = styled(Flex)`
  flex-direction: column;
  width: 80%;
`;

export const ReviewTitleLabel = styled.label`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.l};
  align-self: flex-start;
  margin-bottom: 1em;
`;

export const ReviewTitleInput = styled.input`
  padding: 0.5rem;
  border: 1px solid gray;
  border-radius: 4px;
  width: 100%;
`;

export const ReviewTitleTextArea = styled(ReviewTitleInput)`
  border-radius: 4px;
  height: 100px;
`;

export const ReviewTitleSubmitButton = styled(Button)`
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
