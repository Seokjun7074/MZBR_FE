import Profile from '../../../assets/Profile.png';
import { Button, Container, Header, UserItem } from './BlockedUsers.style';

interface User {
  id: number;
  image: string;
  nickname: string;
}

const DUMMY_USERS: User[] = [
  { id: 1, image: Profile, nickname: 'User1' }, // image 경로를 Profile로 변경
  { id: 2, image: Profile, nickname: 'User2' },
  { id: 3, image: Profile, nickname: 'User3' },
  { id: 4, image: Profile, nickname: 'User4' },
  { id: 5, image: Profile, nickname: 'User5' },
  { id: 6, image: Profile, nickname: 'User6' },
  { id: 7, image: Profile, nickname: 'User7' },
  { id: 8, image: Profile, nickname: 'User8' },
];

// React 컴포넌트 부분
// 나중에 차단한 사용자 정보 가져와서 만들기
// 나중에 차단취소 버튼 누르면 작동하도록 구현하기
const SubcribedUsers = () => {
  return (
    <Container>
      <Header>차단한 사용자 목록</Header>
      {DUMMY_USERS.map((user: User) => (
        <UserItem key={user.id}>
          <img src={user.image} alt={user.nickname} />
          <span>{user.nickname}</span>
          <Button>차단취소</Button>
        </UserItem>
      ))}
    </Container>
  );
};

export default SubcribedUsers;
