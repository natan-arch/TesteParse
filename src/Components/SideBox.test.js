import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBox from './SideBox';

describe('SideBox', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<SideBox />);
      expect(container.firstChild).not.toBeNull();
    });

    it('renders a user avatar or profile image', () => {
      render(<SideBox />);
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });

    it('renders a username or display name', () => {
      render(<SideBox />);
      const textContent = screen.getByText(/\w+/);
      expect(textContent).toBeInTheDocument();
    });
  });
});