import { atom } from 'recoil';

interface VideoAtom {
  file: File | null;
  url: string;
}

export const videoAtom = atom<VideoAtom>({
  key: 'videoAtom',
  default: {
    file: null,
    url: '',
  },
});

interface PreparedVideo {
  videoName: string;
  videoUrl: string;
}

export const previewAtom = atom<string>({
  key: 'previewAtom',
  default: '',
});

// 편집이 완료된 비디오 정보
export const preparedVideoAtom = atom<PreparedVideo[]>({
  key: 'preparedVideoAtom',
  default: [],
});

export const startAtom = atom({
  key: 'startAtom',
  default: 0,
});

export const endAtom = atom({
  key: 'endAtom',
  default: 0,
});

// 비율에 맞게 자른 영상 좌표 정보
export const croppedVideoAtom = atom({
  key: 'croppedVideoAtom',
  default: {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  },
});

export const editingUUIDState = atom({
  key: 'editingUUIDState',
  default: '',
});
