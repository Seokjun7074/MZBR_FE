import { lazy } from 'react';

export const MapPage = lazy(() => import('@/pages/MapPage/MapPage'));
export const IntroPage = lazy(() => import('@/pages/IntroPage/IntroPage'));
export const ReviewEditClip = lazy(
  () => import('@/pages/ReviewPage/ReviewEditClip/ReviewEditClip'),
);

export const Hashtag = lazy(() => import('@/pages/ReviewPage/ReviewHashTag/ReviewHashtag'));
export const ReviewTitle = lazy(() => import('@/pages/ReviewPage/ReviewTitle/ReviewTitle'));
export const UpLoad = lazy(() => import('@/pages/ReviewPage/ReviewUpload/ReviewUpLoad'));
export const ReviewUploading = lazy(
  () => import('@/pages/ReviewPage/ReviewUploading/ReviewUploading'),
);
export const VideoPreview = lazy(() => import('@/pages/ReviewPage/VideoPreview/VideoPreview'));
export const VideoText = lazy(() => import('@/pages/ReviewPage/VideoText/VideoText'));
export const ShortFormPage = lazy(() => import('@/pages/ShortFormPage/ShortFormPage'));
export const SignupPage = lazy(() => import('@/pages/SignupPage/SignupPage'));
export const StoreShrotFormPage = lazy(
  () => import('@/pages/StoreShrotFormPage/StoreShrotFormPage'),
);
export const UserVideoPage = lazy(() => import('@/pages/UserVideoPage/UserVideoPage'));
