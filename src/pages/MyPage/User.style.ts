// MyUserPage.style.ts
import styled from 'styled-components';

export const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  height: 100vh;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
  position: relative;
  top: 90px;
  right: 260px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  top: 20px;
  left: calc(140px);
`;

export const SubscribeButton = styled.button`
  background-color: #f77137;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #e6602e;
  }
`;

export const UserStats = styled.div`
  display: flex;
  align-items: center;
`;

export const UserInfoText = styled.span`
  margint-top: 20px;
  margin-right: 10px;
`;

export const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 20px;
`;

export const VideoThumbnail = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
