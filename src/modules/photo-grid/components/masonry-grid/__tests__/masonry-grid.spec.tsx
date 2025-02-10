import type { PhotoResource } from 'shared/api';

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { generatePhotoList } from 'shared/api';

import { MasonryGrid } from '../masonry-grid';

describe('MasonryGrid Component', () => {
  let photos: PhotoResource[];
  let loadMoreMock: () => void;

  beforeEach(() => {
    photos = generatePhotoList(10);
    loadMoreMock = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls loadMore when scrolling near the bottom', async () => {
    render(
      <MasonryGrid loadMore={loadMoreMock} photos={photos} />
    );

    const container = screen.getByRole('list');
    // Simulate scroll to bottom
    fireEvent.scroll(container, { target: { scrollTop: 9999 } });

    await waitFor(() => {
      expect(loadMoreMock).toHaveBeenCalled();
    });
  });
});
