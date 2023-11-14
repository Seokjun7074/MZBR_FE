import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import IntroPage from '@/pages/IntroPage/IntroPage';
import MapPage from '@/pages/MapPage/MapPage';
import EditProfile from '@/pages/MyPage/EditProfile';
import MyPage from '@/pages/MyPage/MyMain';
import FavoriteRestaurants from '@/pages/MyPage/Restaurant/FavoriteRestaurants';
import BlockedUsers from '@/pages/MyPage/Social/BlockedUsers';
import SubcribedUsers from '@/pages/MyPage/Social/SubscribedUsers';
import UserPage from '@/pages/MyPage/User';
import LikeVideo from '@/pages/MyPage/Video/LikeVideo';
import MyVideo from '@/pages/MyPage/Video/MyVideo';
import WatchingList from '@/pages/MyPage/Video/WatchingList';
import Withdrawal from '@/pages/MyPage/Withdrawal';
import KakaoRedirectPage from '@/pages/RedirectPage/KakaoRedirectPage';
import ReviewEditClip from '@/pages/ReviewPage/ReviewEditClip/ReviewEditClip';
import Hashtag from '@/pages/ReviewPage/ReviewHashTag/ReviewHashtag';
import ReviewTitle from '@/pages/ReviewPage/ReviewTitle/ReviewTitle';
import UpLoad from '@/pages/ReviewPage/ReviewUpload/ReviewUpLoad';
import VideoPreview from '@/pages/ReviewPage/VideoPreview/VideoPreview';
import VideoText from '@/pages/ReviewPage/VideoText/VideoText';
import ShortFormPage from '@/pages/ShortFormPage/ShortFormPage';
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
          path: PATH.MYPAGE,
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
          path: PATH.SHORT_FORM,
          element: <ShortFormPage />,
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
        {
          path: PATH.REVIEW(':restaurant_id'),
          element: <ReviewTitle />,
        },
        {
          path: PATH.REVIEW_HASHTAG(':restaurant_id'),
          element: <Hashtag />,
        },
        {
          path: PATH.REVIEW_UPLOAD(':restaurant_id'),
          element: <UpLoad />,
        },
        {
          path: PATH.REVIEW_EDIT_CLIP(':restaurant_id'),
          element: <ReviewEditClip />,
        },
        {
          path: PATH.VIDEO_PREVIEW(':restaurant_id'),
          element: <VideoPreview />,
        },
        {
          path: PATH.VIDEO_TEXT(':restaurant_id'),
          element: <VideoText />,
        },
        {
          path: '/user/:user_id',
          element: <UserPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
