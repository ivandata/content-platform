import { render, screen } from '@testing-library/react';
import { generatePhotoResource } from 'shared/api';
import { describe, it, expect, vi } from 'vitest';

import { PhotoView } from '../photo-view';

describe('PhotoView Component', () => {
  const mockedPhoto = generatePhotoResource();

  vi.mock('motion/react', () => ({
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
  }));

  vi.mock('shared/components/image', () => ({
    Image: ({ photo, alt }: any) => <img alt={alt} src={photo.src} />,
  }));

  it('renders the photo component with image', () => {
    render(
      <PhotoView photo={mockedPhoto} />
    );

    expect(screen.getByRole('img')).toBeTruthy();
  });

  it('renders photo with correct figure structure', () => {
    render(
      <PhotoView photo={mockedPhoto} />
    );
    const figure = screen.getByRole('figure')
    expect(figure.querySelector('figcaption')).toBeTruthy();
  });
});