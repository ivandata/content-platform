import { css } from '@emotion/react';
import { useMemo, useRef } from 'react';
import { useInfiniteCuratedPhotos } from 'shared/api';

import { MasonryGrid } from './components/masonry-grid';
function PhotoGallery() {
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isSuccess,
    error,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteCuratedPhotos(100);

  const allPhotos = useMemo(() => {
    return data ? data.pages.flatMap(page => page.photos) : []
  }, [data]);

  const handleLoadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  const columnGap = 16
  const styles = getStyles(columnGap);

  return (
    <div css={styles.container} ref={parentRef}>
      {isPending && <div css={styles.loading}>Loading...</div>}

      {isError && <div css={styles.error}>
        Error:
        {error.message}
      </div>}

      {isSuccess && <MasonryGrid
        columnGap={columnGap}
        columnWidth={300}
        loadMore={hasNextPage ? handleLoadMore : undefined}
        photos={allPhotos}
      />}


      {isFetching && !isFetchingNextPage && isSuccess && (
        <div css={styles.backgroundUpdate}>
          Updating in background...
        </div>
      )}
    </div>
  );
}

const getStyles = (gap: number) => ({
  container: css`
    width: 100%;
    height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #f5f5f5;
    padding: ${gap}px;
  `,
  loading: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 1.2rem;
    color: #666;
  `,
  error: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: #dc3545;
    font-size: 1.2rem;
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
});


export default PhotoGallery