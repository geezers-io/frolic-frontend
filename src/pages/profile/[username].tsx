import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { message } from 'antd';
import { useRecoilValue } from 'recoil';

import { UserDetail } from 'api/@types/users';
import { PostsService, UsersService } from 'api/services';
import EmptySpace from 'components/empty/EmptySpace';
import Posts from 'components/post/Posts';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import UserPanel from 'components/userPanel/UserPanel';
import { usePostsInfinityScroll } from 'hooks/usePostsInfinityScroll';
import AppLayout from 'layouts/AppLayout';
import atomStore from 'stores/atom';

const UserProfilePage: NextPage = () => {
  const router = useRouter();
  const username = router.query.username as string | undefined;
  const me = useRecoilValue(atomStore.meAtom);
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState<UserDetail>();

  const {
    posts,
    postsHandler,
    loaderRef,
    showLoader,
    error: postsError,
  } = usePostsInfinityScroll(PostsService.getUserPosts /* FIXME: ByUserName API 복구되면 교체하기 */, {
    ready: !!user,
  });

  const getUser = useCallback(
    async (username: string) => {
      try {
        const user = await UsersService.getUser({ username });
        setUser(user);
      } catch (e) {
        messageApi.error(e.message);
      }
    },
    [messageApi, setUser]
  );

  useEffect(() => {
    if (postsError) {
      messageApi.error(postsError.message);
    }
  }, [postsError]);

  useEffect(() => {
    if (!username) {
      router.push('/404');
      return;
    }

    if (username === me?.userInfo.username) {
      router.push('/profile');
      return;
    }

    getUser(username);
  }, []);

  if (!user) return null;

  return (
    <AppLayout>
      {contextHolder}

      <PostCreateButton addPost={postsHandler.add} />

      <UserPanel user={user} />

      <EmptySpace />

      <Posts
        posts={posts}
        postsHandler={postsHandler}
        loader={{
          show: showLoader,
          ref: loaderRef,
        }}
      />
    </AppLayout>
  );
};

export default UserProfilePage;
