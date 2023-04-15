import React from 'react';

import { Skeleton } from 'antd';

const PostCardSkeleton: React.FC = () => {
  return (
    <section className="flex flex-col gap-1 mb-10">
      {/*<Skeleton.Image className="w-full h-48" active />*/}
      <Skeleton active avatar paragraph={{ rows: 4 }} />
      <section className="flex gap-2 w-full">
        <Skeleton.Button className="flex-1 w-full" />
        <Skeleton.Button className="flex-1 w-full" />
      </section>
    </section>
  );
};

const PostCardsSkeleton: React.FC = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <PostCardSkeleton key={'postCardSkeleton-' + i} />
      ))}
    </>
  );
};

export default PostCardsSkeleton;
