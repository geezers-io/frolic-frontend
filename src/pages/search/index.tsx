import { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';

import { message } from 'antd';

import { Post } from 'api/@types/posts';
import { PostsService } from 'api/services';
import EmptyFeed from 'components/empty/EmptyFeed';
import PostCard from 'components/post/postCard/PostCard';
import PostCardsSkeleton from 'components/post/postCard/PostCardSkeleton';
import AppLayout from 'layouts/AppLayout';
import { hashtagsParser } from 'utils/hashtagParser';

interface Props {
  hashtags: string[];
}

const SearchPage: NextPage<Props> = ({ hashtags }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [posts, setPosts] = useState<Post[]>();

  const getPosts = useCallback(async () => {
    try {
      const posts = await PostsService.getPostsByHashtags({ hashtags, cursorId: null });
      setPosts(posts);
    } catch (e) {
      messageApi.error(e.message);
    }
  }, [hashtags, messageApi]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <AppLayout>
      {contextHolder}

      {posts === undefined && <PostCardsSkeleton />}
      {posts?.length === 0 && <EmptyFeed />}
      {!!posts?.length && (
        <>
          <section className="flex flex-col items-center py-8">
            <div className="flex gap-x-1">
              {hashtags.map((tag) => (
                <h3 key={'hashtagResult-' + tag} className="text-sky-500 text-base md:text-lg">
                  {tag}
                </h3>
              ))}
              <span className="text-base md:text-lg">로 검색하신 결과입니다.</span>
            </div>
            <span className="text-base">총 {posts.length}건</span>
          </section>

          <section>
            <article className="flex flex-col gap-y-7">
              {posts.map((post) => (
                <PostCard key={'postCard-' + post.id} post={post} />
              ))}
            </article>
          </section>
        </>
      )}
    </AppLayout>
  );
};

SearchPage.getInitialProps = async (ctx) => {
  const hashtags = (() => {
    const tagsQuery = (ctx.query.hashtags ?? '') as string;
    const tags = hashtagsParser.deserialize(tagsQuery);

    if (typeof tags === 'string') return [tags];
    if (Array.isArray(tags)) return tags;
    return [];
  })();

  return { hashtags };
};

export default SearchPage;
