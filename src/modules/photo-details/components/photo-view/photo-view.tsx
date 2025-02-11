import type { PhotoResource } from 'shared/api';

import { css } from '@emotion/react';
import { motion } from 'motion/react';
import { Image } from 'shared/components/image';

import { PhotoInfo } from './photo-info';

export interface PhotoDetailProps {
  photo: PhotoResource;
}

export const PhotoView = ({ photo }: PhotoDetailProps) => {
  const styles = getStyles();

  return (
    <motion.div
      css={styles.container}
      layout
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300
      }}
    >
      <figure css={styles.figure}>
        <div css={styles.image}>
          <Image
            aspectRatio={2}
            loading="eager"
            photo={photo}
            priority={true}
          />
        </div>

        <figcaption css={styles.figcaption}>
          <PhotoInfo {...photo} />
        </figcaption>
      </figure>
    </motion.div>
  );
};

const getStyles = () => ({
  container: css`
    max-width: 1200px;
    padding: 24px;
    width: 100%;
  `,
  figure: css`
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative;
  `,
  image: css`
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 
      0 1px 1px rgba(0,0,0,0.11), 
      0 2px 2px rgba(0,0,0,0.11),
      0 4px 4px rgba(0,0,0,0.11),
      0 6px 8px rgba(0,0,0,0.11),
      0 8px 16px rgba(0,0,0,0.11);
  `,
  figcaption: css`
    width: 100%;
    padding: 24px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
  `
});