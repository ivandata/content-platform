import { css } from '@emotion/react';
import { motion } from 'motion/react';
import {
  useState, useEffect, useRef, memo, useCallback 
} from 'react';

import type { PhotoResource } from '../../api'

import { ImageSkeleton } from './skeleton.tsx';

interface ImageProps {
  photo: PhotoResource;
  priority?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  aspectRatio?: number;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const Image = memo(({
  photo,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy',
  aspectRatio,
  fallbackSrc,
  onLoad,
  onError,
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsError(true);
    setIsLoading(false);
    onError?.();
  }, [onError]);

  useEffect(() => {
    const img = imageRef.current;

    if (img) {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleError);
      }
    }

    return () => {
      img?.removeEventListener('load', handleLoad);
      img?.removeEventListener('error', handleError);
    };
  }, [handleError, handleLoad, photo.src]);

  const srcSet = [
    `${photo.src.small} 300w`,
    `${photo.src.medium} 768w`,
    `${photo.src.large} 1024w`,
    photo.src.large2x ? `${photo.src.large2x} 2048w` : ''
  ].filter(Boolean).join(', ');

  const calculatedAspectRatio = aspectRatio ??
    (photo.width && photo.height ? (photo.height / photo.width) : 1);
  const finalSrc = isError ? (fallbackSrc || photo.src.small) : photo.src.medium;
  const styles = getStyles();

  return (
    <div
      css={styles.container}
      style={{ aspectRatio: calculatedAspectRatio }}
    >
      {isLoading && (
        <ImageSkeleton
          aspectRatio={calculatedAspectRatio}
        />
      )}

      <picture>
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
          height={photo.height}
          initial={{ opacity: 0 }}
          loading={priority ? 'eager' : loading}
          onError={handleError}
          onLoad={handleLoad}
          ref={imageRef}
          sizes={sizes}
          src={finalSrc}
          srcSet={srcSet}
          transition={{
            duration: 0.2,
            scale: { type: 'spring', visualDuration: 0.2, bounce: 0.3 },
          }}
          width={photo.width}
        />
      </picture>
    </div>
  );
});

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
  `
})

export { Image };