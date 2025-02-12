import { render, screen, fireEvent, act } from '@testing-library/react';
import { generatePhotoResource } from 'shared/api';

import { MasonryImage } from '../masonry-image';

describe('MasonryImage', () => {
  const mockedPhoto = generatePhotoResource();

  it('renders image with skeleton while loading', () => {
    render(
      <MasonryImage photo={mockedPhoto} />
    );

    expect(screen.getByRole('img')).toBeTruthy();
    expect(screen.getByTestId('image-skeleton')).toBeTruthy();
  });

  it('removes skeleton after image loads', () => {
    render(
      <MasonryImage photo={mockedPhoto} />
    );
    
    const img = screen.getByRole('img');
    act(() => {
      fireEvent.load(img);
    });
    expect(screen.queryByTestId('image-skeleton')).toBeNull();
  });

  it('handles error state and calls onError', () => {
    const onError = vi.fn();
    render(
      <MasonryImage onError={onError} photo={mockedPhoto} />
    );

    const img = screen.getByRole('img');
    act(() => {
      fireEvent.error(img);
    });

    expect(onError).toHaveBeenCalled();
    expect(img.getAttribute('src')).toBe(mockedPhoto.src.tiny);
  });

  it('sets image loading attribute to eager when priority is true', () => {
    render(
      <MasonryImage photo={mockedPhoto} priority />
    );
    const img = screen.getByRole('img');
    expect(img.getAttribute('loading')).toBe('eager');
  });

  it('applies the correct aspect ratio style to container', () => {
    const aspectRatio = 1.5;
    const { container } = render(
      <MasonryImage aspectRatio={aspectRatio} photo={mockedPhoto} />
    );

    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv.style.aspectRatio).toBe('1.5 / 1');
  });
});
