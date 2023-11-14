import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { Flex } from '@/components/common/Flex/Flex';

export const SignupPageWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 4rem;
`;

export const SignupMessage = styled.span`
  width: 100%;
  text-align: start;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: bold;
  color: ${({ theme }) => theme.color.primary};
`;

export const NicknameContainer = styled(Flex)`
  flex-direction: column;
  height: 5rem;
  gap: 1rem;
  width: 80%;
  justify-content: start;
`;

export const InputContainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`;

export const NicknameInput = styled.input`
  width: 60%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.lightgray};
  padding: 1rem;
`;

export const DuplicationButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: none;
  color: ${({ theme }) => theme.color.darkgray};
  background-color: transparent;
  width: 40%;
`;

export const NicknameNotification = styled.span`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: bold;
  color: ${({ theme }) => theme.color.red};
`;
export const ConfirmNotification = styled.span`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: bold;
  color: ${({ theme }) => theme.color.green};
`;

export const SignupButton = styled(Button)``;
