import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBox from './SideBox';

const EXPECTED_SIDE_BOX_IMAGE_COUNT = 6;

jest.mock('./SideBoxImage', () => {
  return function MockSideBoxImage({ src, username }) {
    return <div data-testid="side-box-image" data-src={src} data-username={username} />;
  };
});

describe('SideBox', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<SideBox />);
    });

    it(`renders exactly ${EXPECTED_SIDE_BOX_IMAGE_COUNT} SideBoxImage items`, () => {
      render(<SideBox />);
      const items = screen.getAllByTestId('side-box-image');
      expect(items).toHaveLength(EXPECTED_SIDE_BOX_IMAGE_COUNT);
    });
  });

  describe('data-driven rendering', () => {
    it('renders a unique SideBoxImage for each entry in the data array', () => {
      render(<SideBox />);
      const items = screen.getAllByTestId('side-box-image');
      const usernames = items.map((item) => item.getAttribute('data-username'));
      const uniqueUsernames = new Set(usernames);
      expect(uniqueUsernames.size).toBe(EXPECTED_SIDE_BOX_IMAGE_COUNT);
    });

    it('passes a non-empty src to every SideBoxImage', () => {
      render(<SideBox />);
      const items = screen.getAllByTestId('side-box-image');
      items.forEach((item) => {
        expect(item.getAttribute('data-src')).toBeTruthy();
      });
    });

    it('passes a non-empty username to every SideBoxImage', () => {
      render(<SideBox />);
      const items = screen.getAllByTestId('side-box-image');
      items.forEach((item) => {
        expect(item.getAttribute('data-username')).toBeTruthy();
      });
    });
  });

  describe('edge cases', () => {
    it('does not render more than the expected number of SideBoxImage items', () => {
      render(<SideBox />);
      const items = screen.getAllByTestId('side-box-image');
      expect(items.length).toBeLessThanOrEqual(EXPECTED_SIDE_BOX_IMAGE_COUNT);
    });

    it('does not render fewer than the expected number of SideBoxImage items', () => {
      render(<SideBox />);
      const items = screen.getAllByTestId('side-box-image');
      expect(items.length).toBeGreaterThanOrEqual(EXPECTED_SIDE_BOX_IMAGE_COUNT);
    });
  });
});