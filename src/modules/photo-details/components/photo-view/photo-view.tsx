import type { PhotoResource } from 'shared/api';

import { css } from '@emotion/react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ArrowBackLink from 'shared/components/icons/arrow-back-outline.svg?react'
import { Image } from 'shared/components/image';

import { PhotoInfo } from './photo-info';

export interface PhotoDetailProps {
  photo: PhotoResource;
}

export const PhotoView = ({ photo }: PhotoDetailProps) => {
  const styles = getStyles();
  const canGoBack = window.history.length > 1

  return (
    <motion.article
      css={styles.container}
      layout
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300
      }}
    >
      <header css={styles.header}>
        {canGoBack &&
          <Link css={styles.backLink} to='/'>
            <ArrowBackLink />
            <span>Back to gallery</span>
          </Link>
        }

        <h1>{photo.alt}</h1>
      </header>

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
    </motion.article>
  );
};

const getStyles = () => ({
  container: css`
    max-width: 1200px;
    padding: 24px;
    width: 100%;
  `,
  header: css`
    height: 80px;
    display: flex;
    align-items: center;
    gap: 24px;
    
    h1 {
      margin: 0;
      color: #333333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  `,
  backLink: css`
    display: flex;
    gap: 4px;
    color: #575757;
    text-decoration: none;
    align-items: center;
    border-radius: 6px;
    border: 1px solid #575757;
    height: 30px;
    width: 160px;
    justify-content: center;
    background-color: #ffffff;
    white-space: nowrap;
    padding: 3px 12px;
    transition: color 0.2s ease;
    
    &:hover {
      color: #000000;
    }
    
    svg {
      color: inherit;
      width: 16px;
      height: 16px;
    }
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