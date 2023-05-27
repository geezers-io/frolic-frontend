import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { message } from 'antd';
import { useRecoilValue } from 'recoil';

import { Post } from 'api/@types/posts';
import { UserDetail } from 'api/@types/users';
import { PostsService, UsersService } from 'api/services';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import UserPanel from 'components/userPanel/UserPanel';
import AppLayout from 'layouts/AppLayout';
import atomStore from 'stores/atom';

const UserProfilePage: NextPage = () => {
  const router = useRouter();
  const username = router.query.username as string | undefined;
  const me = useRecoilValue(atomStore.meAtom);
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState<UserDetail>();
  const [posts, setPosts] = useState<Post[]>();

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

  const getPosts = useCallback(async () => {
    try {
      const posts = await PostsService.getUserPosts({ cursorId: null });
      setPosts(posts);
    } catch (e) {
      messageApi.error(e.message);
    }
  }, [messageApi]);

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
    getPosts();
  }, []);

  if (!user) return null;

  return (
    <AppLayout>
      {contextHolder}

      <PostCreateButton />

      <UserPanel user={user} />

      {/*<EmptySpace />*/}

      {posts === undefined && <PostCardsSkeleton />}
      {posts?.length === 0 && <EmptyFeed />}
      {!!posts?.length && posts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export default UserProfilePage;
