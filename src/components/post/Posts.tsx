import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { Post } from 'api/@types/posts';
import EmptyFeed from 'components/empty/EmptyFeed';
import PostCard from 'components/post/postCard/PostCard';
import PostCardsSkeleton from 'components/post/postCard/PostCardSkeleton';
import { PostsHandler } from 'hooks/usePostsInfinityScroll';

interface Props {
  posts: Post[] | undefined;
  postsHandler: PostsHandler;
  loader: {
    show: boolean;
    ref: React.Ref<HTMLDivElement>;
  };
}

const Posts: React.FC<Props> = ({ posts, postsHandler, loader }) => {
  if (posts === undefined) {
    return <PostCardsSkeleton />;
  }

  if (!posts.length) {
    return <EmptyFeed />;
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} postsHandler={postsHandler} />
      ))}

      {loader.show && (
        <div ref={loader.ref} className="flex justify-center py-10">
          <Spin indicator={<LoadingOutlined />} size="large" />
        </div>
      )}
    </>
  );
};

export default Posts;
