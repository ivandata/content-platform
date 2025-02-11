import type { PhotoResource } from 'shared/api';

import { css } from '@emotion/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useMemo, useRef, useState } from 'react';

import { buildMasonryColumns } from './build-masonry-columns';
import { MasonryItem } from './masonry-item';

export interface MasonryGridProps {
  photos: PhotoResource[];
  columnWidth?: number;
  columnGap?: number;
  loadMore?: () => void;
}

const MasonryGrid = ({
  photos,
  columnWidth = 300,
  columnGap = 16,
  loadMore
}: MasonryGridProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      if (parentRef.current) {
        setContainerWidth(parentRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const columns = useMemo(
    () => buildMasonryColumns(photos, containerWidth, columnWidth, columnGap),
    [photos, containerWidth, columnWidth, columnGap]
  )

  useEffect(() => {
    if (!loadMore) return;

    const handleScroll = () => {
      if (!parentRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        loadMore();
      }
    };

    const element = parentRef.current;
    element?.addEventListener('scroll', handleScroll);

    return () => element?.removeEventListener('scroll', handleScroll);
  }, [loadMore, parentRef]);

  const { getVirtualItems, getTotalSize, scrollOffset } = useVirtualizer({
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => columnWidth,
    overscan: 5,
    horizontal: true
  });

  const virtualItems = getVirtualItems();
  const totalSize = getTotalSize() - columnGap;
  const styles = getStyles(columnGap);

  return (
    <div aria-label="Photo gallery" css={styles.container} ref={parentRef} role="list">
      <div
        css={styles.innerContainer}
        style={{
          width: `${totalSize}px`,
          transform: `translateX(${scrollOffset}px)`,
        }}
      >
        {virtualItems.map((virtualColumn) => (
          <div
            aria-label={`Column ${virtualColumn.index + 1}`}
            css={styles.column}
            key={virtualColumn.index}
            role="group"
            style={{
              left: virtualColumn.start,
              width: columnWidth - columnGap,
            }}
          >
            {columns[virtualColumn.index]?.map((photo) => (
              <MasonryItem columnWidth={columnWidth} key={photo.id} photo={photo} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const getStyles = (columnGap: number) => ({
  container: css`
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
  `,
  innerContainer: css`
    position: relative;
    height: 100%;
    margin: 0 auto;
    gap: ${columnGap}px;
    display: flex;
  `,
  column: css`
    padding: 0;
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: ${columnGap}px;
  `,
  item: css`
    width: 100%;
    break-inside: avoid;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,
  link: css`
    display: block;
    text-decoration: none;
    position: relative;
    
    &:focus-visible {
      outline: 3px solid #0066cc;
      outline-offset: 2px;
      border-radius: 10px;
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0);
      transition: background-color 0.2s ease;
      border-radius: 10px;
    }

    &:hover::after {
      background: rgba(0, 0, 0, 0.1);
    }
    
    &:hover .icon {
      opacity: 1;
    }
  `,
  icon: (color: string) => css`
    color: ${color}; 
    height: 24px; 
    width: 24px; 
    display: inline-block; 
    position: absolute; 
    bottom: 8px;
    right: 8px;
    z-index: 100;
    opacity: 0;
  `
});

export { MasonryGrid };