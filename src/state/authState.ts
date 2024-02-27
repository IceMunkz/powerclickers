import { atom } from 'recoil';

interface User {
  email: string;
  token: string;
}

export const authState = atom<{
  isLoggedIn: boolean;
  user: User | null;
}>({
  key: 'authState',
  default: { isLoggedIn: false, user: null },
});