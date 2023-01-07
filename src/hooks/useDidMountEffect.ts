import { useRef } from 'react';

export function useDidMountEffect(fn) {
  const didMountRef = useRef(false);

  if (!didMountRef.current) {
    fn();
  }
  didMountRef.current = true;
}
