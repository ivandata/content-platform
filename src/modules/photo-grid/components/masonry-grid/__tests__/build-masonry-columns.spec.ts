import { generatePhotoList } from 'shared/api';

import { buildMasonryColumns } from '../build-masonry-columns';

describe('buildMasonryColumns', () => {
  const samplePhotos = generatePhotoList(10);

  it('should return an empty array when containerWidth is 0', () => {
    const result = buildMasonryColumns(samplePhotos, 0, 200, 10);
    expect(result).toEqual([]);
  });

  it('should create the correct number of columns based on containerWidth', () => {
    const result = buildMasonryColumns(samplePhotos, 800, 200, 10);
    expect(result.length).toBe(3);
  });

  it('should distribute photos into columns based on the shortest column', () => {
    const result = buildMasonryColumns(samplePhotos, 600, 200, 10);
    expect(result.length).toBe(2);
    expect(result.flat().length).toBe(samplePhotos.length);
  });

  it('should handle a single-column layout correctly', () => {
    const result = buildMasonryColumns(samplePhotos, 200, 200, 10);
    expect(result.length).toBe(1);
    expect(result[0].length).toBe(samplePhotos.length);
  });

  it('should correctly calculate column heights and assign photos accordingly', () => {
    const result = buildMasonryColumns(samplePhotos, 800, 200, 10);
    const columnHeights = result.map((col) =>
      col.reduce((sum, photo) => sum + (photo.height / photo.width) * 200 + 10, 0)
    );

    expect(columnHeights[0]).toBeLessThanOrEqual(Math.max(...columnHeights));
  });

  it('should return empty columns when given an empty photo array', () => {
    const result = buildMasonryColumns([], 800, 200, 10);
    expect(result).toEqual([[], [], []]);
  });
});
