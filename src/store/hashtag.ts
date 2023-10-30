import { atom } from 'recoil';

export const hashtagState = atom<string[]>({
  key: 'hashtagState',
  default: [],
});
