import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBox from './SideBox';

describe('SideBox', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<SideBox />);
      expect(container.firstChild).not.toBeNull();
    });

    it('renders a profile image', () => {
      render(<SideBox />);
      const profileImage = screen.getByRole('img');
      expect(profileImage).toBeInTheDocument();
    });

    it('renders a profile image with an alt attribute', () => {
      render(<SideBox />);
      const profileImage = screen.getByRole('img');
      expect(profileImage).toHaveAttribute('alt');
      expect(profileImage.getAttribute('alt').length).toBeGreaterThan(0);
    });
  });

  describe('suggestions section', () => {
    it('renders a suggestions label or heading', () => {
      render(<SideBox />);
      const suggestionText = screen.getByText(/suggest/i);
      expect(suggestionText).toBeInTheDocument();
    });

    it('renders at least one suggested user entry', () => {
      render(<SideBox />);
      const followButtons = screen.getAllByText(/follow/i);
      expect(followButtons.length).toBeGreaterThan(0);
    });
  });

  describe('user info section', () => {
    it('renders a username', () => {
      render(<SideBox />);
      const { container } = render(<SideBox />);
      const usernameElements = container.querySelectorAll('.sideBox_username, .username, [class*="user"]');
      expect(usernameElements.length).toBeGreaterThan(0);
    });
  });
});