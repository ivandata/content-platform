import { css } from '@emotion/react';
import { useState, useEffect, useRef, memo } from 'react';

import type { PhotoResource } from '../../types'

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

const Image = memo(function Image({
  photo,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy',
  aspectRatio,
  fallbackSrc,
  onLoad,
  onError,
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imageRef.current;

    if (img && img.complete) {
      setIsLoading(false);
    }
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    setIsLoading(false);
    onError?.();
  };

  const calculatedAspectRatio = aspectRatio ?? (photo.height / photo.width);

  const srcSet = `
    ${photo.src.small} 300w,
    ${photo.src.medium} 768w,
    ${photo.src.large} 1024w,
    ${photo.src.large2x} 2048w
  `;

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

        <img
          alt={photo.alt}
          css={styles.image}
          height={photo.height}
          loading={priority ? 'eager' : loading}
          onError={handleError}
          onLoad={handleLoad}
          ref={imageRef}
          sizes={sizes}
          src={isError ? (fallbackSrc ?? photo.src.small) : photo.src.medium}
          srcSet={srcSet}
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