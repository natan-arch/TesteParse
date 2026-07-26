import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBox from './SideBox';

jest.mock('./SideBoxImage', () => ({ src, username }) => (
  <div data-testid="sidebox-image" data-username={username} data-src={src} />
));

describe('SideBox', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<SideBox />);
    });

    it('renders exactly 6 SideBoxImage items', () => {
      render(<SideBox />);
      const items = screen.getAllByTestId('sidebox-image');
      expect(items).toHaveLength(6);
    });
  });

  describe('SideBoxImage props', () => {
    it('passes a non-empty src to every SideBoxImage', () => {
      render(<SideBox />);
      const items = screen.getAllByTestId('sidebox-image');
      items.forEach((item) => {
        expect(item.getAttribute('data-src')).toBeTruthy();
      });
    });

    it('passes a non-empty username to every SideBoxImage', () => {
      render(<SideBox />);
      const items = screen.getAllByTestId('sidebox-image');
      items.forEach((item) => {
        expect(item.getAttribute('data-username')).toBeTruthy();
      });
    });

    it('passes unique usernames to each SideBoxImage', () => {
      render(<SideBox />);
      const items = screen.getAllByTestId('sidebox-image');
      const usernames = items.map((item) => item.getAttribute('data-username'));
      const uniqueUsernames = new Set(usernames);
      expect(uniqueUsernames.size).toBe(items.length);
    });
  });

  describe('edge cases', () => {
    it('renders the correct number of items when the data array has exactly 6 entries', () => {
      render(<SideBox />);
      expect(screen.getAllByTestId('sidebox-image')).toHaveLength(6);
    });
  });
});