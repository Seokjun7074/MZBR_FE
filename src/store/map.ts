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

interface Boundary {
  toplat: number;
  toplng: number;
  bottomlat: number;
  bottomlng: number;
}

export const mapBoundaryState = atom<Boundary | null>({
  key: 'mapBoundaryState',
  default: null,
});
