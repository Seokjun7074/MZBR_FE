import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

export const HashTagInputWrapper = styled(Flex)`
  width: 30rem;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
`;

export const TagContainer = styled(Flex)`
  width: 100%;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const TagInput = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 8px;
`;
