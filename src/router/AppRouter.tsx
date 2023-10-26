import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import IntroPage from '@/pages/IntroPage/IntroPage';
import MapPage from '@/pages/MapPage/MapPage';
import EditProfile from '@/pages/MyPage/EditProfile';
import MyPage from '@/pages/MyPage/MyMain';
import FavoriteRestaurants from '@/pages/MyPage/Restaurant/FavoriteRestaurants';
import BlockedUsers from '@/pages/MyPage/Social/BlockedUsers';
import SubcribedUsers from '@/pages/MyPage/Social/SubscribedUsers';
import LikeVideo from '@/pages/MyPage/Video/LikeVideo';
import MyVideo from '@/pages/MyPage/Video/MyVideo';
import WatchingList from '@/pages/MyPage/Video/WatchingList';
import Withdrawal from '@/pages/MyPage/Withdrawal';
import KakaoRedirectPage from '@/pages/RedirectPage/KakaoRedirectPage';
import SignupPage from '@/pages/SignupPage/SignupPage';

import { PATH } from '@/constants/path';

import App from '@/App';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <IntroPage />,
    },
    {
      path: PATH.ROOT,
      element: <App />,
      errorElement: <></>,
      children: [
        {
          path: PATH.SIGNUP,
          element: <SignupPage />,
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
        {
          path: PATH.KAKAO_REDIRECT,
          element: <KakaoRedirectPage />,
        },
        {
          path: PATH.MAP,
          element: <MapPage />,
        },
        {
          path: '/mypage/edit',
          element: <EditProfile />,
        },
        {
          path: '/mypage/withdrawal',
          element: <Withdrawal />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
