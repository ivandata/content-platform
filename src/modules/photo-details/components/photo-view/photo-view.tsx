import type { PhotoResource } from 'shared/api';

import { css } from '@emotion/react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackLink from 'shared/components/icons/arrow-back-outline.svg?react'
import TargetBlankIcon  from 'shared/components/icons/open-outline.svg?react'

import { PhotoImage } from './photo-image';

export interface PhotoDetailProps {
  photo: PhotoResource;
}

export const PhotoView = ({ photo }: PhotoDetailProps) => {
  const canGoBack = window.history.length > 1
  const styles = useMemo(() => getStyles(), []);

  return (
    <motion.article
      css={styles.article}
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

        <h1>
          <i>{photo.alt}</i>
          {' '}

          <span css={styles.photographer}>
            {photo.alt ? 'by' : 'Photographer:'}
            {' '}

            <a
              css={styles.author}
              href={photo.photographer_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>{photo.photographer}</span>
              <TargetBlankIcon />
            </a>
          </span>
        </h1>
      </header>

      <figure css={styles.figure}>
        <div css={styles.image}>
          <PhotoImage
            loading="eager"
            photo={photo}
            priority={true}
          />
        </div>

        <figcaption css={styles.figcaption}>
          <div css={styles.metadata} data-testid="dimensions">
            <span>
              {photo.width}
              {' '}
              ×
              {' '}
              {photo.height}
            </span>
          </div>
        </figcaption>
      </figure>
    </motion.article>
  );
};

const getStyles = () => ({
  article: css`
    max-width: 1200px;
    padding: 24px;
    width: 100%;
    max-height: 100vh;
    overflow: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  header: css`
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    h1 {
      margin: 0;
      color: #333333;
      font-weight: normal;
    }
  `,
  photographer: css`
    white-space: nowrap;
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
    position: relative;
    
    &:focus-visible {
      outline: 3px solid #0066cc;
      outline-offset: 2px;
      border-radius: 10px;
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0);
      transition: background-color 0.2s ease;
      border-radius: 10px;
    }
    
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
  `,
  author: css`
    color: #333333;
    font-size: 20px;
    font-weight: 600;
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 6px;
    position: relative;
    
    svg {
      height: 18px;
      width: 18px;
    }

    &:focus-visible {
      outline: 3px solid #0066cc;
      outline-offset: 2px;
      border-radius: 10px;
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0);
      transition: background-color 0.2s ease;
      border-radius: 10px;
    }
    
    &:hover {
      text-decoration: none;
    }
  `,
  metadata: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
  `,
});