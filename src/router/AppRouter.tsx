import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditProfile from '@/pages/MyPage/EditProfile';
import MyPage from '@/pages/MyPage/MyMain';
import FavoriteRestaurants from '@/pages/MyPage/Restaurant/FavoriteRestaurants';
import BlockedUsers from '@/pages/MyPage/Social/BlockedUsers';
import SubcribedUsers from '@/pages/MyPage/Social/SubscribedUsers';
import UserPage from '@/pages/MyPage/User';
import LikeVideo from '@/pages/MyPage/Video/LikeVideo';
import MyVideo from '@/pages/MyPage/Video/MyVideo';
import Withdrawal from '@/pages/MyPage/Withdrawal';
import KakaoRedirectPage from '@/pages/RedirectPage/KakaoRedirectPage';

import Spinner from '@/components/common/Spinner/Spinner';

import { PATH } from '@/constants/path';

import App from '@/App';

import * as Lazy from './lazy';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: (
        <Suspense fallback={<Spinner />}>
          <Lazy.IntroPage />
        </Suspense>
      ),
    },
    {
      path: PATH.ROOT,
      element: <App />,
      errorElement: <></>,
      children: [
        {
          path: PATH.SIGNUP,
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.SignupPage />
            </Suspense>
          ),
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
          path: PATH.KAKAO_REDIRECT,
          element: <KakaoRedirectPage />,
        },
        {
          path: PATH.SHORT_FORM,
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.ShortFormPage />
            </Suspense>
          ),
        },
        {
          path: PATH.SHORT_FORM_STORE(':storeId'),
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.StoreShrotFormPage />
            </Suspense>
          ),
        },
        {
          path: PATH.MAP,
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.MapPage />
            </Suspense>
          ),
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
          path: PATH.REVIEW(':storeId'),
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.ReviewTitle />
            </Suspense>
          ),
        },
        {
          path: PATH.REVIEW_HASHTAG(':storeId'),
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.Hashtag />
            </Suspense>
          ),
        },
        {
          path: PATH.REVIEW_UPLOAD(':storeId'),
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.UpLoad />
            </Suspense>
          ),
        },
        {
          path: PATH.REVIEW_EDIT_CLIP(':storeId'),
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.ReviewEditClip />
            </Suspense>
          ),
        },
        {
          path: PATH.VIDEO_PREVIEW(':storeId'),
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.VideoPreview />
            </Suspense>
          ),
        },
        {
          path: PATH.VIDEO_TEXT(':storeId'),
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.VideoText />
            </Suspense>
          ),
        },
        {
          path: PATH.VIDEO_UPLOADING(':storeId'),
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.ReviewUploading />
            </Suspense>
          ),
        },
        {
          path: '/user/:user_id',
          element: <UserPage />,
        },
        {
          path: PATH.USER_VIDEO(':userId'),
          element: (
            <Suspense fallback={<Spinner />}>
              <Lazy.UserVideoPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
