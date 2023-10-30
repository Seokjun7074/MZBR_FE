// UpLoad.style.ts
import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Heading = styled.h1`
  color: #f77137;
  margin-bottom: 70px;
`;

export const Box = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 150px;
  background-color: #ebebeb;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
  text-align: center;
  margin-bottom: 40px;
`;

export const NextButton = styled.button`
  padding: 10px 200px;
  border: none;
  background-color: #f77137;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
`;

// UpLoad.style.ts

export const Image = styled.img`
  width: 50px; // 원하는 너비로 설정
  height: auto; // 비율 유지를 위해 auto로 설정
  max-width: 100%; // 부모 요소를 벗어나지 않도록 설정
`;

export const ImageCaption = styled.p`
  color: #f77137;
  font-size: 1rem;
  margin-top: 10px;
  text-align: center;
`;
