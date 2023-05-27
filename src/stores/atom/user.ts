import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { v1 } from 'uuid';

import { UserDetail } from 'api/@types/users';
import { safetyLocalStorage } from 'utils/storage';

const { persistAtom } = recoilPersist({ key: 'me', storage: safetyLocalStorage });

export const meAtom = atom<UserDetail | undefined>({
  key: `me/${v1()}`,
  default: undefined,
  effects: [persistAtom],
});
