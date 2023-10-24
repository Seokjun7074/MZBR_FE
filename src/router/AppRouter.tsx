import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Intro from '@/pages/Intro/Intro';
import MyPage from '@/pages/MyPage/MyMain';
import FavoriteRestaurants from '@/pages/MyPage/Restaurant/FavoriteRestaurants';
import BlockedUsers from '@/pages/MyPage/Social/BlockedUsers';
import SubcribedUsers from '@/pages/MyPage/Social/SubscribedUsers';
import LikeVideo from '@/pages/MyPage/Video/LikeVideo';
import MyVideo from '@/pages/MyPage/Video/MyVideo';
import WatchingList from '@/pages/MyPage/Video/WatchingList';

import { PATH } from '@/constants/path';

import App from '@/App';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <App />,
      errorElement: <></>,
      children: [
        {
          path: '',
          element: <Intro />,
        },
        {
          path: '/mypage',
          element: <MyPage />,
        },
        {
          path: '/mypage/favoriterestaurnat',
          element: <FavoriteRestaurants />,
        },
        {
          path: '/mypage/blockedusers',
          element: <BlockedUsers />,
        },
        {
          path: '/mypage/subscribedusers',
          element: <SubcribedUsers />,
        },
        {
          path: '/mypage/likevideo',
          element: <LikeVideo />,
        },
        {
          path: '/mypage/myvideo',
          element: <MyVideo />,
        },
        {
          path: '/mypage/watchinglist',
          element: <WatchingList />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
