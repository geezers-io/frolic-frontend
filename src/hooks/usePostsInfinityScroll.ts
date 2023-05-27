import { useState, useEffect, useMemo } from 'react';

import type { CursorId, Post } from 'api/@types/posts';
import { last } from 'utils/last';

import { useIntersect } from './useIntersect';

export type PostsHandler = {
  add: (added: Post) => void;
  edit: (edited: Post) => void;
  remove: (postId: number) => void;
};

interface Options<Req> {
  ready?: boolean;
  additionalReqFields?: Omit<Req, 'cursorId'>;
}

export function usePostsInfinityScroll<
  Req extends { cursorId: CursorId },
  TLoaderElement extends HTMLElement = HTMLDivElement
>(loadFn: (req: Req) => Promise<Post[]>, { ready = true, additionalReqFields }: Options<Req> = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [cursorId, setCursorId] = useState<CursorId>(null);
  const [posts, setPosts] = useState<Post[] | undefined>();
  const initialLoaded = posts !== undefined;

  const postsHandler = useMemo<PostsHandler>(
    () => ({
      add: (added: Post) => {
        setPosts((prev) => [added, ...(prev ?? [])]);
      },
      edit: (edited: Post) => {
        setPosts((prev) => prev?.map((post) => (post.id === edited.id ? edited : post)));
      },
      remove: (postId: number) => {
        setPosts((prev) => prev?.filter(({ id }) => id !== postId));
      },
    }),
    []
  );

  const [loaderRef, entry] = useIntersect<TLoaderElement>({
    threshold: 0.5,
  });

  const hasMore = cursorId !== null;
  const shouldLoadMore = !initialLoaded || Boolean(entry?.isIntersecting && hasMore && !loading && !error);

  useEffect(() => {
    if (!ready) return;
    if (!shouldLoadMore) return;

    (async () => {
      try {
        setLoading(true);

        const nextPosts = await loadFn({
          cursorId: cursorId ?? null,
          ...additionalReqFields,
        } as Req);

        if (!nextPosts.length) {
          setCursorId(null);
          return;
        }

        setPosts((prev) => [...(prev ?? []), ...nextPosts]);
        setCursorId(last(nextPosts).id);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [ready, entry?.isIntersecting]);

  return {
    posts,
    postsHandler,
    error,
    loaderRef,
    showLoader: hasMore || loading,
  };
}
