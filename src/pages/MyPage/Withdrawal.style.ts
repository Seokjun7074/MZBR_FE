import styled from 'styled-components';

export const Title = styled.h1`
  color: #f77137;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 6rem;
`;

export const Label = styled.label`
  display: block;
  margin-top: 3rem;
  margin-right: 150px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-top: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.8rem;
  margin-top: 30rem;
  background-color: #f77137;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #f45c07;
  }
`;
