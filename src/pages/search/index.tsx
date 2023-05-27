import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { message } from 'antd';

import { PostsService } from 'api/services';
import Posts from 'components/post/Posts';
import { usePostsInfinityScroll } from 'hooks/usePostsInfinityScroll';
import AppLayout from 'layouts/AppLayout';
import { hashtagsParser } from 'utils/hashtagParser';

interface Props {
  hashtags: string[];
}

const SearchPage: NextPage<Props> = ({ hashtags }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { posts, postsHandler, loaderRef, showLoader, error } = usePostsInfinityScroll(
    PostsService.getPostsByHashtags,
    {
      additionalReqFields: {
        hashtags,
      },
    }
  );

  useEffect(() => {
    if (error) {
      messageApi.error(error.message);
    }
  }, [error]);

  return (
    <AppLayout>
      {contextHolder}

      {!!posts?.length && (
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
      )}

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
