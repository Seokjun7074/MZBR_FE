import styled from 'styled-components';

import { Flex } from '@/components/common/Flex/Flex';

const HashTag = ({ text }: { text: string }) => {
  return <HashTagContainer>#{text}</HashTagContainer>;
};

const HashTagContainer = styled(Flex)`
  background-color: ${({ theme }) => theme.color.lightgray};
  color: ${({ theme }) => theme.color.darkgray};
  border-radius: 16px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border: 2px solid ${({ theme }) => theme.color.gray};
  cursor: pointer;
  &:hover {
    background-color: #a8a8a8;
    border: 2px solid #a8a8a8;
    color: white;
  }
`;

export default HashTag;
