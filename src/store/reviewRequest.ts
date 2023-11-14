import { atom } from 'recoil';

import { ReviewRequest } from '@/types/review';

const initState = {
  videoUuid: '', //영상의 uuid
  storeId: 1, //식당의 pk
  description: '', //영상의 설명
  tags: [], //영상의 해시태그
  star: 4, // 영상의 별점
  thumbnailName: '', //프리사인 url로 업로드 완료된 이미지의 이름
  audio: {
    fileName: '', //프리사인 url로 업로드 완료된 오디오의 이름
    volume: 0, //오디오의 불륨
  },
  clips: [],
  subtitles: [],
};

export const reviewRequestState = atom<ReviewRequest>({
  key: 'reviewRequestState',
  default: initState,
});
