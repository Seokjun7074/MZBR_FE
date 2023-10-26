import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 2px solid #f77137;
  margin-top: -240px;
`;

export const Button = styled.button<{ active?: boolean }>`
  padding: 10px 30px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  background-color: ${(props) => (props.active ? '#f77137' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#f77137')};
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? '#f77137' : '#fddad0')};
  }
`;
