import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { Flex } from '@/components/common/Flex/Flex';

export const StoreShrotFormPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0f0f0f;
  flex-direction: column;
  overflow: auto;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  video {
    background-color: black;
  }
`;

export const EmptyReviewContainer = styled(Flex)`
  height: 100%;
  flex-direction: column;
  gap: 2rem;

  h1 {
    color: ${({ theme }) => theme.color.primary};
    font-weight: bold;
  }
  span {
    color: ${({ theme }) => theme.color.darkgray};
    font-size: ${({ theme }) => theme.fontSize.m};
    font-weight: bold;
  }
`;

export const ReviewButton = styled(Button)`
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSize.m};
`;
