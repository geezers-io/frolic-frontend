import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { UserDetail } from 'api/@types/user';

const { persistAtom } = recoilPersist({ key: 'me', storage: localStorage });

export const meAtom = atom<UserDetail | undefined>({
  key: 'me',
  default: undefined,
  effects: [persistAtom],
});
