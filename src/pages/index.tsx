import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { message } from 'antd';
import { useRecoilState } from 'recoil';

import { PostsService } from 'api/services';
import EmptyFeed from 'components/empty/EmptyFeed';
import PostCard from 'components/post/postCard/PostCard';
import PostCardsSkeleton from 'components/post/postCard/PostCardSkeleton';
import PostCreateButton from 'components/post/postForm/PostCreateButton';
import { useDidMountEffect } from 'hooks/useDidMountEffect';
import AppLayout from 'layouts/AppLayout';
import atomStore from 'stores/atom';

const Feed = () => {
  const router = useRouter();
  const [posts, setPosts] = useRecoilState(atomStore.postsAtom);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const getPosts = useCallback(
    async (page, size) => {
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
  useDidMountEffect(() => {
    getPosts(0, 999).then();
  });

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
      {posts?.length === 0 ? <EmptyFeed /> : posts?.map((post) => <PostCard key={post.postId} post={post} />)}
    </AppLayout>
  );
};

export default Feed;
