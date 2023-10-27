import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  margin: 0 50px;
  border-bottom: 2px solid #f77137;
  margin-top: -50px;
  margin-bottom: 50px;
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

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2개의 컬럼 생성
  gap: 16px; // 각 이미지 사이의 간격
  padding: 20px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 250px; // 세로 크기 조정
  object-fit: cover; // 이미지 비율 유지하면서 채우기
  border-radius: 10px; // 둥글게
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 약간의 그림자 효과
`;
