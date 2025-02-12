import type { PhotoResource } from 'shared/api'

import { css } from '@emotion/react';
import { memo } from 'react';
import { ImageSkeleton } from 'shared/components/skeleton';
import { useImageLoader } from 'shared/hooks';

interface GridImageProps {
  photo: PhotoResource;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  aspectRatio?: number;
  onLoad?: () => void;
  onError?: () => void;
}

const MasonryImage = memo(({
  photo,
  priority = false,
  loading = 'lazy',
  aspectRatio,
  onLoad,
  onError,
}: GridImageProps) => {
  const { isLoading, isError, handleLoad, handleError } = useImageLoader({ onLoad, onError });

  const calculatedAspectRatio = aspectRatio ??
    (photo.width && photo.height ? (photo.height / photo.width) : 1);
  const src = isError ? photo.src.tiny : photo.src.large;

  return (
    <div
      css={styles.container}
      style={{ aspectRatio: calculatedAspectRatio }}
    >
      {isLoading && (
        <ImageSkeleton aspectRatio={calculatedAspectRatio} />
      )}

      {photo.url && <img
        alt={photo.alt}
        css={styles.image}
        height={photo.height}
        loading={priority ? 'eager' : loading ?? 'lazy'}
        onError={handleError}
        onLoad={handleLoad}
        src={src}
        width={photo.width}
      />}
    </div>
  );
});

const styles = {
  container: css`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f0f0f0;
    border-radius: 10px;
  `,
  image: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    color: #333333;
    font-size: 14px;
  `
};

export { MasonryImage };
