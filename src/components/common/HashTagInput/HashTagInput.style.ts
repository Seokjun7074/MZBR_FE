import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

export const HashTagInputWrapper = styled(Flex)`
  flex-direction: column;
`;

export const TagInput = styled.input`
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 8px;
`;

export const TagContainer = styled(Flex)`
  width: 35rem;
  gap: 0.5rem;
  flex-wrap: wrap;
  position: absolute;
  top: 6.5rem;
`;
