import { css } from '@emotion/react';
import * as motion from 'motion/react-client'

interface ImageSkeletonProps {
  width?: number;
  height?: number;
  aspectRatio?: number;
}


const ImageSkeleton = ({ aspectRatio = 1 }: ImageSkeletonProps) => {
  return (
    <div
      aria-hidden="true"
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f0f0f0;
        overflow: hidden;
      `}
      role="presentation"
      style={{ aspectRatio }}
    >
      <motion.div
        animate={{ x: ['-50%', '150%'] }}
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 50%;
          background: linear-gradient(
            90deg,
            rgba(240, 240, 240, 0) 0%,
            rgba(224, 224, 224, 0.8) 50%,
            rgba(240, 240, 240, 0) 100%
          );
        `}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export type { ImageSkeletonProps };
export { ImageSkeleton };
