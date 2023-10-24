import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  font-size: 1.8rem;
  padding: 1rem;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 8px;
  font-weight: bold;
`;
