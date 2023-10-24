import styled from 'styled-components';

export const PageWrapper = styled.div`
  margin-left: -25rem; // Layout의 padding을 상쇄하기 위해
`;

export const VideoHeader = styled.h1`
  margin-left: 0;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const NavigationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; // 'flex-start' 대신 'center'로 변경하여 세로 중앙 정렬
  position: relative; // 추가: relative positioning을 설정합니다.
  padding-right: 20px; // 오른쪽 패딩 추가, 화살표와 텍스트 간의 간격 조절
  margin-top: 25px;
  margin-bottom: 15px;
  cursor: pointer;

  ::after {
    content: '▶'; // 화살표 추가
    position: absolute;
    right: -250px;
    top: 50%; // 세로 중앙 정렬
    transform: translateY(-50%); // 세로 중앙 정렬
    font-size: 16px; // 필요에 따라 폰트 크기 조절
  }
`;

export const ProfileItem = styled.h1`
  display: flex; // 이미지와 텍스트를 수평으로 배치합니다.
  align-items: center; // 이미지와 텍스트를 수직 중앙 정렬합니다.

  img {
    height: 36px;
    width: auto;
  }

  span {
    font-weight: bold;
    font-size: 20px;
    margin-right: 10px;
    margin-left: 20px;
    margin-top: -15px; // 텍스트를 조금 위로 올립니다. 필요에 따라 값을 조절하세요.
  }
`;
