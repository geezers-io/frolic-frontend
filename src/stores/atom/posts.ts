import { atom } from 'recoil';

import { Post } from 'api/@types/posts';

export const postsAtom = atom<Post[]>({ key: 'posts', default: [] });
