import styled from 'styled-components';

export const Container = styled.div`
  margin-top: -50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; // 가로 중앙 정렬을 위한 스타일
`;

export const Title = styled.h1`
  color: #f77137;
  margin-bottom: 70px;
  text-align: center; // 텍스트를 가로 중앙으로 정렬
`;

export const RestaurantItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 50px;
  width: 100%; // 100%로 설정하여 버튼을 오른쪽으로 밀어내기 위해

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }

  div {
    flex: 1; // div에 flex 1을 주어 오른쪽 버튼을 밀어낸다.
    display: flex;
    flex-direction: column;
  }
`;

export const UnfavoriteButton = styled.button`
  background-color: #f77137;
  color: white;
  padding: 3px 6px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto; // 버튼을 오른쪽으로 밀어내기 위한 스타일
`;
