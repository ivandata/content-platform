import { render, screen } from '@testing-library/react';
import { generatePhotoResource } from 'shared/api';
import { describe, it, expect, vi } from 'vitest';

import { PhotoInfo } from '../photo-info';

// Mock dependencies
vi.mock('shared/components/icons/open-outline.svg?react', () => ({
  default: () => <svg data-testid="target-blank-icon" />
}));

vi.mock('shared/helpers/get-contrasting-color.ts', () => ({
  getContrastingColor: vi.fn()
}));

describe('PhotoInfo', () => {
  const mockedPhoto = generatePhotoResource();

  it('applies correct attributes to photographer link', () => {
    render(
      <PhotoInfo {...mockedPhoto} />
    );
    const link = screen.getByRole('link');

    expect(link?.getAttribute('href')).toBe(mockedPhoto.photographer_url);
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link.textContent).toBe(mockedPhoto.photographer);
  });
  it('displays correct image dimensions', () => {
    render(
      <PhotoInfo {...mockedPhoto} />
    );

    expect(screen.getByTestId('dimensions')?.textContent).toBe(`${mockedPhoto.width} × ${mockedPhoto.height}`);
  });
});