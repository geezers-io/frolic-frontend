import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { message } from 'antd';

import { PostsService } from 'api/services';
import Posts from 'components/post/Posts';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import { usePostsInfinityScroll } from 'hooks/usePostsInfinityScroll';
import AppLayout from 'layouts/AppLayout';

const MainPage: NextPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { posts, postsHandler, loaderRef, showLoader, error } = usePostsInfinityScroll(PostsService.getPosts);

  useEffect(() => {
    if (error) {
      messageApi.error(error.message);
    }
  }, [error]);

  return (
    <AppLayout>
      {contextHolder}

      <PostCreateButton addPost={postsHandler.add} />

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

export default MainPage;
