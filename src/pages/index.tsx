import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { message } from 'antd';
import { useRecoilState } from 'recoil';

import { Post } from 'api/@types/posts';
import { PostsService } from 'api/services';
import EmptyFeed from 'components/empty/EmptyFeed';
import PostCard from 'components/post/postCard/PostCard';
import PostCardsSkeleton from 'components/post/postCard/PostCardSkeleton';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import AppLayout from 'layouts/AppLayout';
import atomStore from 'stores/atom';

const mockPosts: Post[] = [
  {
    id: 1,
    userInfo: {
      id: 1,
      email: 'email@gmail.com',
      username: 'username',
      realname: 'realname',
      phoneNumber: 'phoneNumber',
      createdDate: '2023-02-19T11:51:45.128Z',
      updatedDate: '2023-02-19T11:51:45.128Z',
    },
    textContent: '게시글 1',
    comments: [{} as any, {} as any, {} as any, {} as any],
    hashtags: [],
    likeCount: 2,
    files: [],
    createdDate: '2023-02-19T11:51:45.128Z',
    updatedDate: '2023-02-19T11:51:45.128Z',
    likeUp: false,
  },
];

const MainPage: NextPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useRecoilState(atomStore.mainPagePostsAtom);

  const [initialLoaded, setInitialLoaded] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const getPosts = useCallback(
    async (page: number, size: number) => {
      try {
        // setLoading(true);
        const posts = await PostsService.getPosts({ page, size });
        setPosts(posts);
        setInitialLoaded(true);
      } catch (err) {
        await messageApi.error(err.message, 1);
        router.push('/auth/sign-in');
      } finally {
        // setLoading(false);
      }
    },
    [messageApi, router, setPosts]
  );

  // TODO: 페이지네이션 구현하기
  useEffect(() => {
    getPosts(0, 999);
  }, []);

  if (!initialLoaded) {
    return (
      <AppLayout>
        {contextHolder}
        <PostCardsSkeleton />
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      {contextHolder}
      <PostCreateButton />
      {mockPosts?.length === 0 ? <EmptyFeed /> : mockPosts?.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export default MainPage;
