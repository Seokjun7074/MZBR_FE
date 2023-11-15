import { atom } from 'recoil';

export const centerState = atom<google.maps.LatLngLiteral>({
  key: 'centerState',
  default: {
    lat: 37.4994561,
    lng: 127.0359577,
  },
});

export const myPositionState = atom<google.maps.LatLngLiteral>({
  key: 'myPositionState',
  default: {
    lat: 0,
    lng: 0,
  },
});

interface Boundary {
  topLat: number;
  topLng: number;
  bottomLat: number;
  bottomLng: number;
}

export const mapBoundaryState = atom<Boundary>({
  key: 'mapBoundaryState',
  default: {
    topLat: 0,
    topLng: 0,
    bottomLat: 0,
    bottomLng: 0,
  },
});
