import type { PhotoResource } from 'shared/api';

import { css } from '@emotion/react';
import { motion } from 'motion/react';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ForwardIcon from 'shared/components/icons/arrow-forward-outline.svg?react';
import { getContrastingColor } from 'shared/helpers/get-contrasting-color';

import { MasonryImage } from './masonry-image';

interface MasonryItemProps {
  photo: PhotoResource;
}

export const MasonryItem = memo(({ photo }: MasonryItemProps) => {
  const styles = useMemo(() => getStyles(), []);

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: .95 }}
      transition={{
        duration: 0.2,
        scale: { type: 'spring', visualDuration: 0.2, bounce: 0.3 },
      }}
    >
      {photo.photographer_id ?
        <Link
          aria-label={`View photo details: ${photo.alt}`}
          css={styles.link}
          tabIndex={0}
          to={`/photos/${photo.id}`}
        >
          <motion.div
            className="label"
            css={styles.label(getContrastingColor(photo.avg_color))}
          >
            <span>Photo details</span>

            <motion.span
              css={styles.icon}
            >
              <ForwardIcon />
            </motion.span>
          </motion.div>

          <MasonryImage
            aspectRatio={photo.height / photo.width}
            photo={photo}
          />
        </Link>
        : <MasonryImage
          aspectRatio={photo.height / photo.width}
          photo={photo}
        />
      }
    </motion.div>
  );
});

const getStyles = () => ({
  link: css`
    display: block;
    text-decoration: none;
    position: relative;

    &:focus-visible {
      outline: 3px solid rgb(13, 81, 255);
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

    &:hover::after {
      background: rgba(0, 0, 0, 0.1);
    }

    &:hover .label {
      opacity: 1;
      transform: translateX(0);
    }
  `,
  label: (color: string) => css`
    color: ${color};
    position: absolute;
    font-weight: bold;
    bottom: 16px;
    right: 16px;
    z-index: 100;
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  icon: css`
    color: inherit;
    height: 16px;
    width: 16px;
    display: flex;
    
    svg {
      width: 100%;
      height: 100%;
    }
  `
});