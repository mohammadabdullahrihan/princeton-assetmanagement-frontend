import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useLazyLoadAssets Hook
 * Manages chunked loading of assets for smooth scrolling in large galleries.
 * 
 * @param {Array} allAssets - The full list of assets from the server.
 * @param {number} chunkSize - Number of items to load at a time.
 */
export const useLazyLoadAssets = (allAssets = [], chunkSize = 20) => {
  const [visibleAssets, setVisibleAssets] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Reset when source data changes
  useEffect(() => {
    setVisibleAssets(allAssets.slice(0, chunkSize));
    setHasMore(allAssets.length > chunkSize);
  }, [allAssets, chunkSize]);

  const lastElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setVisibleAssets(prev => {
          const nextIndex = prev.length + chunkSize;
          const nextBatch = allAssets.slice(0, nextIndex);
          if (nextBatch.length >= allAssets.length) {
            setHasMore(false);
          }
          return nextBatch;
        });
      }
    });

    if (node) observer.current.observe(node);
  }, [allAssets, chunkSize, hasMore]);

  return { visibleAssets, lastElementRef, hasMore };
};
