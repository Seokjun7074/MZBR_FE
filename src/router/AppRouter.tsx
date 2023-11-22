import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

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
          path: PATH.KAKAO_REDIRECT,
          element: (
            <Suspense fallback={<Spinner />}>
              <KakaoRedirectPage />
            </Suspense>
          ),
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
