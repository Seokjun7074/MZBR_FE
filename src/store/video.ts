import { atom } from 'recoil';

interface VideoAtom {
  file: File | null;
  url: string;
  blob: Blob | null;
}

export const videoAtom = atom<VideoAtom>({
  key: 'videoAtom',
  default: {
    file: null,
    url: '',
    blob: null,
  },
});

export const preparedVideoAtom = atom<string[]>({
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

export const croppedVideoAtom = atom({
  key: 'croppedVideoAtom',
  default: {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  },
});
