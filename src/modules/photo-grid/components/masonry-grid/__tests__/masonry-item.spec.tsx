import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { generatePhotoResource, generateEmptyPhotoResource } from 'shared/api';
import { describe, it, expect, vi } from 'vitest';

import { MasonryItem } from '../masonry-item';

// Mock dependencies
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  }
}));

vi.mock('shared/components/icons/arrow-forward-outline.svg?react', () => ({
  default: () => <svg data-testid="forward-icon" />
}));

vi.mock('../masonry-image', () => ({
  MasonryImage: ({ photo }: any) => (
    <img
      alt={photo.alt}
      src={photo.src.medium}
    />
  )
}));

vi.mock('shared/helpers/get-contrasting-color', () => ({
  getContrastingColor: vi.fn().mockReturnValue('#000000')
}));

describe('MasonryItem', () => {
  const mockedPhoto = generatePhotoResource();

  const renderWithRouter = (component: React.ReactNode) => {
    return render(
      <MemoryRouter>
        {component}
      </MemoryRouter>
    );
  };

  it('renders link with correct attributes', () => {
    renderWithRouter(
      <MasonryItem photo={mockedPhoto} />
    );

    const link = screen.getByRole('link');

    expect(link?.getAttribute('href')).toBe(`/photos/${mockedPhoto.id}`);
    expect(link?.getAttribute('aria-label')).toBe(`View photo details: ${mockedPhoto.alt}`);
    expect(link?.getAttribute('tabindex')).toBe('0');
  });

  it('renders Image component with correct props', () => {
    renderWithRouter(
      <MasonryItem photo={mockedPhoto} />
    );

    expect(screen.getByRole('img')).toBeTruthy()
  });

  it('does not render a link when photographer_id is missing', () => {
    const photoWithoutPhotographer = generateEmptyPhotoResource();

    renderWithRouter(
      <MasonryItem photo={photoWithoutPhotographer} />
    );

    expect(screen.queryByRole('link')).toBeFalsy();
  });
})