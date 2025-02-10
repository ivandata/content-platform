import type { PhotoResource } from 'shared/api';

/**
 * Build masonry columns from a list of photos based on container width, column width, and gap.
 *
 * @param photos - Array of photo resources.
 * @param containerWidth - The width of the container.
 * @param columnWidth - The fixed width of each column.
 * @param columnGap - The gap between columns.
 * @returns An array of columns, each containing PhotoResource objects.
 */
export const buildMasonryColumns = (
  photos: PhotoResource[],
  containerWidth: number,
  columnWidth: number,
  columnGap: number
): PhotoResource[][] => {
  if (!containerWidth) return [];

  // Calculate the number of columns.
  const columnsCount = Math.max(1, Math.floor(containerWidth / (columnWidth + columnGap)));

  // Initialize columns and their cumulative heights.
  const cols: PhotoResource[][] = Array.from({ length: columnsCount }, () => []);
  const columnHeights = new Array(columnsCount).fill(0);

  // Distribute each photo to the shortest column.
  photos.forEach((photo) => {
    // Calculate the photo's height when rendered.
    const photoHeight = (photo.height / photo.width) * columnWidth + columnGap;

    // Find the index of the column with the smallest current height.
    let shortestColumnIndex = 0;
    let smallestHeight = columnHeights[0];
    for (let i = 1; i < columnsCount; i++) {
      if (columnHeights[i] < smallestHeight) {
        smallestHeight = columnHeights[i];
        shortestColumnIndex = i;
      }
    }

    // Place the photo in the selected column and update its cumulative height.
    cols[shortestColumnIndex].push(photo);
    columnHeights[shortestColumnIndex] += photoHeight;
  });

  return cols;
};
