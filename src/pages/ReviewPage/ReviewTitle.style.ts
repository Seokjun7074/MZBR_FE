import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
`;

export const HeaderText = styled.p`
  color: #f77137;
  font-size: 24px;
  font-weight: bold;
  margin-top: -2em;
  margin-bottom: 1em;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 15px;
  align-self: flex-start;
  margin-top: 2em;
  margin-left: -4em;
  text-size: 4px;
  margin-bottom: 1em;
`;

export const Input = styled.input`
  margin-top: 0.5em;

  width: 150%;
  padding: 0.5em;
  border: 1px solid gray;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  margin-top: 0.5em;
  width: 150%;
  height: 120px;
  padding: 0.5em;
  border: 1px solid gray;
  border-radius: 4px;
`;

export const StarContainer = styled.div`
  margin-top: 1em;
`;

export const Star = styled.span<{ filled: boolean }>`
  font-size: 40px;
  margin-right: 8px;
  color: ${(props) => (props.filled ? 'yellow' : 'gray')};
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  background-color: #f77137;
  border: none;
  color: white;
  padding: 8px 40px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 80px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d65a28; // 색상을 조금 어둡게 변경
  }
`;
