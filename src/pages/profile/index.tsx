import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { message } from 'antd';
import { useRecoilValue } from 'recoil';

import { PostsService } from 'api/services';
import EmptySpace from 'components/empty/EmptySpace';
import Posts from 'components/post/Posts';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import UserPanel from 'components/userPanel/UserPanel';
import { usePostsInfinityScroll } from 'hooks/usePostsInfinityScroll';
import AppLayout from 'layouts/AppLayout';
import atomStore from 'stores/atom';

const MeProfilePage: NextPage = () => {
  const me = useRecoilValue(atomStore.meAtom);
  const [messageApi, contextHolder] = message.useMessage();

  const { posts, postsHandler, loaderRef, showLoader, error } = usePostsInfinityScroll(PostsService.getUserPosts);

  useEffect(() => {
    if (error) {
      messageApi.error(error.message);
    }
  }, [error]);

  if (!me) {
    return null;
  }
  return (
    <AppLayout>
      {contextHolder}

      <PostCreateButton addPost={postsHandler.add} />

      <UserPanel user={me} />

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

export default MeProfilePage;
