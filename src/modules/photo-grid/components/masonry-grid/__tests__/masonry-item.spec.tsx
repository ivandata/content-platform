import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { generatePhotoResource } from 'shared/api';
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

vi.mock('shared/components/image', () => ({
  Image: ({ photo, aspectRatio, sizes }: any) => (
    <img
      alt={photo.alt}
      data-aspect-ratio={aspectRatio}
      data-sizes={sizes}
      src={photo.src}
    />
  )
}));

vi.mock('shared/helpers/get-contrasting-color', () => ({
  getContrastingColor: vi.fn().mockReturnValue('#000000')
}));

describe('MasonryItem', () => {
  const mockedPhoto = generatePhotoResource();
  const mockColumnWidth = 300;

  const renderWithRouter = (component: React.ReactNode) => {
    return render(
      <MemoryRouter>
        {component}
      </MemoryRouter>
    );
  };

  it('renders link with correct attributes', () => {
    renderWithRouter(
      <MasonryItem columnWidth={mockColumnWidth} photo={mockedPhoto} />
    );

    const link = screen.getByRole('link');

    expect(link?.getAttribute('href')).toBe(`/photos/${mockedPhoto.id}`);
    expect(link?.getAttribute('aria-label')).toBe(`View photo details: ${mockedPhoto.alt}`);
    expect(link?.getAttribute('role')).toBe('link');
    expect(link?.getAttribute('tabindex')).toBe('0');
  });

  it('renders Image component with correct props', () => {
    renderWithRouter(
      <MasonryItem columnWidth={mockColumnWidth} photo={mockedPhoto} />
    );

    expect(screen.getByRole('img')).toBeTruthy()
  });
})