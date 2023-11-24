import { atom } from 'recoil';

export const centerState = atom<google.maps.LatLngLiteral | null>({
  key: 'centerState',
  default: null,
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
    bottomLat: 37.4902678764768,
    bottomLng: 127.0294224173828,
    topLat: 37.51256825840636,
    topLng: 127.05002178261718,
  },
});
