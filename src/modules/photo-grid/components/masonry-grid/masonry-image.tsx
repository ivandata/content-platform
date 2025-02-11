import type { PhotoResource } from 'shared/api'

import { css } from '@emotion/react';
import { motion } from 'motion/react';
import { useState, memo, useCallback, useMemo } from 'react';
import { ImageSkeleton } from 'shared/components/image/skeleton';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsError(true);
    setIsLoading(false);
    onError?.();
  }, [onError]);

  const calculatedAspectRatio = aspectRatio ??
    (photo.width && photo.height ? (photo.height / photo.width) : 1);
  const src = isError ? photo.src.tiny : photo.src.large;
  const styles = useMemo(() => getStyles(), []);

  return (
    <div
      css={styles.container}
      style={{ aspectRatio: calculatedAspectRatio }}
    >
      {isLoading && (
        <ImageSkeleton aspectRatio={calculatedAspectRatio} />
      )}

      {photo.url && <motion.img
        alt={photo.alt}
        animate={{ opacity: 1 }}
        css={styles.image}
        height={photo.height}
        initial={{ opacity: 0 }}
        loading={priority ? 'eager' : loading ?? 'lazy'}
        onError={handleError}
        onLoad={handleLoad}
        src={src}
        transition={{
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.3, bounce: 0.5 },
        }}
        width={photo.width}
      />}
    </div>
  );
});

// Use the same styles as the original Image component
const getStyles = () => ({
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
});

export { MasonryImage };
