import { render, screen, fireEvent, act } from '@testing-library/react';
import { generatePhotoResource } from 'shared/api';

import { Image } from '../image';

describe('Image Component', () => {
  const mockPhoto = generatePhotoResource();

  it('renders image with skeleton while loading', () => {
    render(
      <Image photo={mockPhoto} />
    );
    expect(screen.getByRole('img')).toBeTruthy();
    expect(screen.getByTestId('image-skeleton')).toBeTruthy();
  });

  it('removes skeleton after image loads', async () => {
    render(
      <Image photo={mockPhoto} />
    );

    const img = screen.getByRole('img');
    act(() => {
      fireEvent.load(img);
    });

    expect(screen.queryByTestId('image-skeleton')).toBeNull();
  });

  it('handles error state and calls onError', async () => {
    const onError = vi.fn();
    render(
      <Image onError={onError} photo={mockPhoto} />
    );

    const img = screen.getByRole('img');
    act(() => {
      fireEvent.error(img);
    });

    expect(onError).toHaveBeenCalled();
    expect(img.getAttribute('src')).toBe(mockPhoto.src.small);
  });

  it('uses fallback source on error', async () => {
    const fallbackSrc = 'fallback.jpg';
    render(
      <Image fallbackSrc={fallbackSrc} photo={mockPhoto} />
    );

    const img = screen.getByRole('img');
    act(() => {
      fireEvent.error(img);
    });

    expect(img.getAttribute('src')).toBe(fallbackSrc);
  });
});