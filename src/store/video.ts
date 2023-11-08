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

export const preparedVideoAtom = atom<VideoAtom[]>({
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
