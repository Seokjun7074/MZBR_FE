import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const TopSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  margin-top: -100px;
  margin-right: 80px;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
  margin-right: 60px;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Nickname = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ChangeImageButton = styled.button`
  background-color: #f77137;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

// export const InputLabel = styled.label`
//   font-size: 1rem;
//   margin-top: 10px;
// `;

export const InputGroup = styled.div`
  display: flex;
  //   margin-top: 30px;
  margin-bottom: 30px;
  align-items: center;
  margin-top: 5px;
`;

export const Input = styled.input`
  padding: 5px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const CheckNicknameButton = styled.button`
  background-color: #f77137;
  color: white;
  //   margin-top: 30px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

export const UpdateButton = styled.button`
  background-color: #f77137;
  color: white;
  padding: 10px 20px;
  margin-top: 30px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;
