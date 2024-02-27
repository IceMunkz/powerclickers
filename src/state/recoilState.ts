import { atom } from 'recoil';

export const videoState = atom<boolean>({
  key: 'videoState',
  default: false,
});
  export const audioState = atom<boolean>({
    key: 'audioState',
    default: false,
});