import { atom } from 'recoil';
import { v1 } from 'uuid';

import { Post } from 'api/@types/posts';

export const mainPagePostsAtom = atom<Post[]>({
  key: `mainPagePosts/${v1()}`,
  default: [],
});
