import { Skeleton } from 'antd';
import shortid from 'shortid';

const PostCardSkeleton = () => {
  return (
    <section className="flex flex-col gap-1 mb-10">
      <Skeleton.Image className="w-full h-48" active />
      <Skeleton active avatar paragraph={{ rows: 4 }} />
      <section className="flex gap-2 w-full">
        <Skeleton.Button className="flex-1 w-full" />
        <Skeleton.Button className="flex-1 w-full" />
      </section>
    </section>
  );
};

const PostCardsSkeleton = () => {
  return (
    <>
      {[...Array(3)].map(() => (
        <PostCardSkeleton key={shortid.generate()} />
      ))}
    </>
  );
};

export default PostCardsSkeleton;
