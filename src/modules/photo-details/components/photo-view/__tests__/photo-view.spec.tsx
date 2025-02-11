import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { generatePhotoResource } from 'shared/api';
import { describe, it, expect, vi } from 'vitest';

import { PhotoView } from '../photo-view';

describe('PhotoView Component', () => {
  const mockedPhoto = generatePhotoResource();

  vi.mock('motion/react', () => ({
    motion: {
      article: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
  }));

  vi.mock('shared/components/image', () => ({
    Image: ({ photo, alt }: any) => <img alt={alt} src={photo.src} />,
  }));

  vi.mock('shared/components/icons/arrow-back-outline.svg?react', () => ({
    default: () => <svg data-testid="arrow-back-icon" />
  }));

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <PhotoView photo={mockedPhoto} />
      </MemoryRouter>
    );

  it('renders photo title in h1', () => {
    renderComponent();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe(mockedPhoto.alt);
  });

  it('renders a photo component with image', () => {
    renderComponent();

    expect(screen.getByRole('img')).toBeTruthy();
  });

  it('renders photo with correct figure structure', () => {
    renderComponent();

    const figure = screen.getByRole('figure')
    expect(figure.querySelector('figcaption')).toBeTruthy();
  });

  describe('back button', () => {
    beforeEach(() => {
      Object.defineProperty(window.history, 'length', {
        configurable: true,
        value: 1
      });
    });

    it('shows back button when history length > 1', () => {
      Object.defineProperty(window.history, 'length', {
        configurable: true,
        value: 2
      });
      renderComponent();

      const backLink = screen.getByRole('link', { name: /back to gallery/i });
      expect(backLink).toBeDefined();
      expect(backLink.getAttribute('href')).toBe('/');
    });

    it('hides back button when history length <= 1', () => {
      renderComponent();

      const backLink = screen.queryByRole('link', { name: /back to gallery/i });
      expect(backLink).toBeNull();
    });
  });
});

