import styled from 'styled-components';

export const StarContainer = styled.div``;

export const Star = styled.span<{ $filled: boolean }>`
  font-size: 40px;
  margin-right: 8px;
  color: ${({ $filled, theme }) => ($filled ? theme.color.yellow : theme.color.gray)};
  cursor: pointer;
`;
