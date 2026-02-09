import { useRef, useCallback } from 'react';

/**
 * useInfiniteScroll Hook
 * Simplifies server-side infinite scrolling by providing an IntersectionObserver ref.
 * 
 * @param {boolean} hasMore - Whether there are more items to fetch.
 * @param {boolean} isLoading - Whether a fetch is currently in progress.
 * @param {function} onLoadMore - Function to call when the last element is reached.
 */
export const useInfiniteScroll = (hasMore, isLoading, onLoadMore) => {
  const observer = useRef();

  const lastElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });

    if (node) observer.current.observe(node);
  }, [hasMore, isLoading, onLoadMore]);

  return { lastElementRef };
};
