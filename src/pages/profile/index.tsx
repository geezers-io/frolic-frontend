import { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';

import { message } from 'antd';
import { useRecoilState } from 'recoil';

import { Post } from 'api/@types/posts';
import { PostsService, UserService } from 'api/services';
import EmptyFeed from 'components/empty/EmptyFeed';
import EmptySpace from 'components/empty/EmptySpace';
import PostCard from 'components/post/postCard/PostCard';
import PostCardsSkeleton from 'components/post/postCard/PostCardSkeleton';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import UserPanel from 'components/userPanel/UserPanel';
import AppLayout from 'layouts/AppLayout';
import atomStore from 'stores/atom';

const MeProfilePage: NextPage = () => {
  const [me, setMe] = useRecoilState(atomStore.meAtom);
  const [messageApi, contextHolder] = message.useMessage();
  const [myPosts, setMyPosts] = useState<Post[]>();

  const getMe = useCallback(async () => {
    try {
      const me = await UserService.getMe();
      setMe(me);
    } catch (e) {
      messageApi.error(e.message);
    }
  }, [messageApi, setMe]);

  const getMyPosts = useCallback(async () => {
    try {
      const myPosts = await PostsService.getUserPosts({ page: 0, size: 99999 });
      setMyPosts(myPosts);
    } catch (e) {
      messageApi.error(e.message);
    }
  }, [messageApi]);

  useEffect(() => {
    getMe();
    getMyPosts();
  }, []);

  if (!me) {
    return null;
  }
  return (
    <AppLayout>
      {contextHolder}

      <PostCreateButton />

      <UserPanel user={me} />

      <EmptySpace />

      {myPosts === undefined && <PostCardsSkeleton />}
      {myPosts?.length === 0 && <EmptyFeed />}
      {myPosts?.length && myPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export default MeProfilePage;
