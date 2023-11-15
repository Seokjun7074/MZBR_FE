import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { Flex } from '@/components/common/Flex/Flex';

export const RestaurantDetailWrapper = styled(Flex)`
  width: 30rem;
  height: 100%;
  flex-direction: column;
  padding: 1rem;
  gap: 1.5rem;
`;

export const RestaurantDetailHeader = styled(Flex)`
  width: 100%;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.primary};

  span {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSize.l};
    word-break: keep-all;
  }
`;

export const RestaurantDetailBody = styled(Flex)`
  width: 100%;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  justify-content: space-between;
  text-align: start;
  color: ${({ theme }) => theme.color.darkgray};

  span {
    font-weight: bold;
    word-break: keep-all;
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

export const ReviewButton = styled(Button)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.primary};
  font-weight: bold;
  padding: 0.6rem;
  font-size: ${({ theme }) => theme.fontSize.m};
`;
