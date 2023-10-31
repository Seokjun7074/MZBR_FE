import { atom } from 'recoil';

export const centerState = atom<google.maps.LatLngLiteral>({
  key: 'centerState',
  default: {
    lat: 0,
    lng: 0,
  },
});

export const myPositionState = atom<google.maps.LatLngLiteral>({
  key: 'myPositionState',
  default: {
    lat: 0,
    lng: 0,
  },
});
