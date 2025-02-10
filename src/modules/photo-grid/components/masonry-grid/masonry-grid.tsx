import type { PhotoResource } from 'shared/api';

import { css } from '@emotion/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Image } from 'shared/components/image';

import { buildMasonryColumns } from './build-masonry-columns';

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
    <div css={styles.container} ref={parentRef} role="list">
      <div
        css={styles.innerContainer}
        style={{
          width: `${totalSize}px`,
          transform: `translateX(${scrollOffset}px)`,
        }}
      >
        {virtualItems.map((virtualColumn) => (
          <div
            css={styles.column}
            key={virtualColumn.index}
            style={{
              left: virtualColumn.start,
              width: columnWidth - columnGap,
            }}
          >
            {columns[virtualColumn.index]?.map((photo) => (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                key={photo.id}
                transition={{
                  duration: 0.2,
                  scale: { type: 'spring', visualDuration: 0.2, bounce: 0.3 },
                }}
              >
                <Image
                  aspectRatio={photo.height / photo.width}
                  photo={photo}
                  sizes={`${columnWidth}px`}
                />
              </motion.div>
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
  `
});

export { MasonryGrid };