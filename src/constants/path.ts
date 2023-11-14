export const PATH = {
  ROOT: '/',
  SIGNUP: '/signup',
  KAKAO_REDIRECT: '/kakao/code',
  SHORT_FORM: '/shorts',
  MAP: '/map',
  MYPAGE: '/mypage',
  REVIEW: (restaurant_id: string) => `/review/${restaurant_id}`,
  REVIEW_HASHTAG: (restaurant_id: string) => `/review/${restaurant_id}/hashtag`,
  REVIEW_UPLOAD: (restaurant_id: string) => `/review/${restaurant_id}/upload`,
  REVIEW_EDIT_CLIP: (restaurant_id: string) => `/review/${restaurant_id}/clip`,
  VIDEO_PREVIEW: (restaurant_id: string) => `/review/${restaurant_id}/video-preview`,
  VIDEO_TEXT: (restaurant_id: string) => `/review/${restaurant_id}/video-text`,
};
