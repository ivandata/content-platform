import type { PhotoResource } from 'shared/api'

import { css } from '@emotion/react';
import { motion } from 'motion/react';
import { memo } from 'react';
import { ImageSkeleton } from 'shared/components/skeleton';
import { useImageLoader } from 'shared/hooks';

interface ImageProps {
  photo: PhotoResource;
  priority?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const PhotoImage = memo(({
  photo,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy',
  fallbackSrc,
  onLoad,
  onError,
}: ImageProps) => {
  const { isLoading, isError, handleLoad, handleError } = useImageLoader({ onLoad, onError });

  const srcSet = [
    `${photo.src.small} 300w`,
    `${photo.src.medium} 768w`,
    `${photo.src.large} 1024w`,
    photo.src.large2x ? `${photo.src.large2x} 2048w` : ''
  ].filter(Boolean).join(', ');

  const finalSrc = isError ? (fallbackSrc || photo.src.small) : photo.src.medium;

  return (
    <div css={styles.container} style={{ height: isLoading ? '50vh' : '100%' }}>
      {isLoading && <ImageSkeleton />}
      
      {photo.url && <picture css={styles.picture}>
        <source
          media="(orientation: portrait)"
          srcSet={photo.src.portrait}
          type="image/jpeg"
        />

        <source
          media="(orientation: landscape)"
          srcSet={photo.src.landscape}
          type="image/jpeg"
        />

        <motion.img
          alt={photo.alt}
          animate={{ opacity: 1 }} 
          css={styles.image}
          initial={{ opacity: 0 }}
          loading={priority ? 'eager' : loading}
          onError={handleError}
          onLoad={handleLoad}
          sizes={sizes}
          src={finalSrc}
          srcSet={srcSet}
          transition={{
            duration: 0.2,
            scale: { visualDuration: 0.4, bounce: 0.5 },
          }}
        />
      </picture>}
    </div>
  );
});

const styles = {
  container: css`
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: #f0f0f0;
    border-radius: 10px;
  `,
  image: css`
    width: 100%;
  `,
  picture: css`
    display: flex;
  `,
};

export { PhotoImage };