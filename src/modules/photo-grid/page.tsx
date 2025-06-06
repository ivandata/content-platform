import { css } from '@emotion/react';
import { useCallback, useMemo } from 'react';
import { useInfiniteCuratedPhotos, generateSkeletonPhotos } from 'shared/api';

import { MasonryGrid } from './components/masonry-grid';



function PhotoGallery() {
  const {
    data,
    isSuccess,
    isPending,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteCuratedPhotos(50);

  const handleLoadMore = useCallback(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const photos = useMemo(() => {
    if (isPending) {
      return generateSkeletonPhotos(50);
    }

    return data ? data.pages.flatMap(page => page.photos) : [];
  }, [data, isPending]);

  const columnGap = 16

  return (
    <div css={styles.container(columnGap)}>
      <MasonryGrid
        columnGap={columnGap}
        columnWidth={300}
        loadMore={hasNextPage ? handleLoadMore : undefined}
        photos={photos}
      />


      {isFetching && !isFetchingNextPage && isSuccess && (
        <div css={styles.backgroundUpdate}>
          Updating in background...
        </div>
      )}
    </div>
  );
}

const styles = {
  container: (gap: number) => css`
    width: 100%;
    height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: ${gap}px;
  `,
  backgroundUpdate: css`
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    color: #666;
  `,
};


export default PhotoGallery