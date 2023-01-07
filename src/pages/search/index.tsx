import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

import { message } from 'antd';
import { isNil } from 'lodash';
import qs from 'qs';
import shortid from 'shortid';

import { Post } from 'api/@types/posts';
import { PostsService } from 'api/services';
import PostCard from 'components/post/postCard/PostCard';
import { useDidMountEffect } from 'hooks/useDidMountEffect';
import AppLayout from 'layouts/AppLayout';

const SearchHashtag = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [posts, setPosts] = useState<Post[]>([]);

  const hashtags = useMemo<string[]>(() => {
    // TODO: router.query 에 hashtags 가 어떤 식으로 들어오는지 확인할 것. qs.parse 따로 해야하는지?
    const tagsQuery = (router.query.hashtags ?? '') as string;
    const tags = qs.parse(tagsQuery);

    if (typeof tags === 'string') return [tags];
    if (Array.isArray(tags)) return tags;

    throw new Error('Invalid tags type');
  }, [router.query.hashtags]);

  const getPosts = useCallback(async () => {
    try {
      const posts = await PostsService.getPostsByHashtags({ hashtags });
      setPosts(posts);
    } catch (e) {
      messageApi.error(e.message);
    }
  }, [hashtags, messageApi]);

  useDidMountEffect(() => {
    getPosts().then();
  });

  return (
    <AppLayout>
      {contextHolder}

      {isNil(posts) ? null : (
        <>
          <section className="flex flex-col items-center py-8">
            <div className="flex gap-x-1">
              {hashtags.map((tag) => (
                <h3 key={shortid.generate()} className="text-sky-500 text-base md:text-lg">
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
                <PostCard key={shortid.generate()} post={post} />
              ))}
            </article>
          </section>
        </>
      )}
    </AppLayout>
  );
};

export default SearchHashtag;
