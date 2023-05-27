import { useState, useEffect } from 'react';

import type { CursorId, Post } from 'api/@types/posts';
import { last } from 'utils/last';

import { useIntersect } from './useIntersect';

interface Options<Req> {
  ready?: boolean;
  onLoad?: (nextPosts: Post[]) => void;
  additionalReqFields?: Omit<Req, 'cursorId'>;
  initialPosts?: Post[];
}

export function usePostsInfinityScroll<
  Req extends { cursorId: CursorId },
  TLoaderElement extends HTMLElement = HTMLDivElement
>(
  loadFn: (req: Req) => Promise<Post[]>,
  { ready = true, onLoad, additionalReqFields, initialPosts }: Options<Req> = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [cursorId, setCursorId] = useState<CursorId>(null);
  const [posts, setPosts] = useState<Post[] | undefined>(initialPosts);
  const initialLoaded = posts !== undefined;

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
        onLoad?.(nextPosts);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [ready, entry?.isIntersecting]);

  return {
    posts,
    error,
    initialLoaded,
    loaderRef,
    showLoader: hasMore || loading,
  };
}
