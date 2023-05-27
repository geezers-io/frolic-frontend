import { useEffect, useRef, useState } from 'react';

export function useIntersect<T extends Element>(options?: IntersectionObserverInit) {
  const [node, setNode] = useState<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(([entry]) => setEntry(entry), options);

    const { current: currentObserver } = observer;

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry] as const;
}
