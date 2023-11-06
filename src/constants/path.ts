export const PATH = {
  ROOT: '',
  SIGNUP: 'signup',
  KAKAO_REDIRECT: 'kakao/redirect',
  MAP: 'map',
  MYPAGE: 'mypage',
  REVIEW: (restaurant_id: string) => `review/${restaurant_id}`,
  REVIEW_HASHTAG: (restaurant_id: string) => `review/${restaurant_id}/hashtag`,
  REVIEW_UPLOAD: (restaurant_id: string) => `review/${restaurant_id}/upload`,
};
