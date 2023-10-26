import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';

export const SearchCurrentPosition = styled(Button)`
  position: fixed;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1);
  bottom: 7.5rem;
  width: 16rem;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: bold;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
`;
