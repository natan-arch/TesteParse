import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBoxImage from './SideBoxImage';

describe('SideBoxImage', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<SideBoxImage />);
    });

    it('renders an image element', () => {
      render(<SideBoxImage />);
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
    });

    it('renders an image with a non-empty src attribute', () => {
      render(<SideBoxImage />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src');
      expect(image.getAttribute('src')).not.toBe('');
    });

    it('renders an image with an alt attribute for accessibility', () => {
      render(<SideBoxImage />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt');
    });
  });

  describe('edge cases', () => {
    it('renders a single image element', () => {
      render(<SideBoxImage />);
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(1);
    });

    it('renders the image inside the component container', () => {
      const { container } = render(<SideBoxImage />);
      expect(container.firstChild).not.toBeNull();
    });
  });
});