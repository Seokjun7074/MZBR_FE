import styled from 'styled-components';

export const Container = styled.div`
  margin-top: -50px;
  padding: 20px;
`;

export const Header = styled.h1`
  color: #f77137;
  margin-bottom: 70px;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }

  span {
    flex: 1;
  }
`;

export const Button = styled.button`
  background-color: #f77137;
  color: white;
  padding: 3px 6px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: -40px;
`;
