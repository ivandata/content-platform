import type { PhotoResource } from 'shared/api';

import { css } from '@emotion/react';
import { motion } from 'motion/react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import ForwardIcon from 'shared/components/icons/arrow-forward-outline.svg?react';
import { Image } from 'shared/components/image';
import { getContrastingColor } from 'shared/helpers/get-contrasting-color';

interface MasonryItemProps {
  photo: PhotoResource;
  columnWidth: number;
}

export const MasonryItem = memo(({ photo, columnWidth }: MasonryItemProps) => {
  const styles = getStyles()

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.2,
        scale: { type: 'spring', visualDuration: 0.2, bounce: 0.3 },
      }}
    >
      <Link
        aria-label={`View photo details: ${photo.alt}`}
        css={styles.link}
        role="link"
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

        <Image
          aspectRatio={photo.height / photo.width}
          photo={photo}
          sizes={`${columnWidth}px`}
        />
      </Link>
    </motion.div>
  );
});

const getStyles = () => ({
  link: css`
    display: block;
    text-decoration: none;
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