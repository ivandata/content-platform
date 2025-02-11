import type { PhotoResource } from 'shared/api';

import { css } from '@emotion/react';
import { Fragment } from 'react';
import TargetBlankIcon  from 'shared/components/icons/open-outline.svg?react'
import { getContrastingColor } from 'shared/helpers/get-contrasting-color.ts';

export const PhotoInfo = (photo: PhotoResource) => {
  const styles = getStyles(getContrastingColor(photo.avg_color));

  return (
    <Fragment>      
      {photo.alt && <h1 css={styles.title}>{photo.alt}</h1>}

      <div css={styles.metadata}>
        <div css={styles.metaItem}>
          <a
            css={styles.author}
            href={photo.photographer_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{photo.photographer}</span>
            <TargetBlankIcon />
          </a>
        </div>

        <div css={styles.metaItem} data-testid="dimensions">
          <span>
            {photo.width}
            {' '}
            × 
            {' '}
            {photo.height}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

const getStyles = (textColor: string) => ({
  title: css`
    font-size: 24px;
    font-weight: 600;
    color: ${textColor};
  `,
  metadata: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: ${textColor};
  `,
  metaItem: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
  `,
  author: css`
    color: ${textColor};
    font-size: 20px;
    font-weight: 600;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 6px;
    
    svg {
      height: 18px;
      width: 18px;
    }
    
    &:hover {
      text-decoration: none;
    }
  `
});