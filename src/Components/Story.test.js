import React from 'react';
import { render, screen } from '@testing-library/react';
import Story from './Story';

describe('Story', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Story />);
    });

    it('renders at least one StoryElement', () => {
      render(<Story />);
      const storyElements = screen.getAllByRole('img');
      expect(storyElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('carousel composition', () => {
    it('renders a carousel container', () => {
      const { container } = render(<Story />);
      const carousel = container.firstChild;
      expect(carousel).toBeInTheDocument();
    });

    it('renders multiple story items', () => {
      render(<Story />);
      const storyElements = screen.getAllByRole('img');
      expect(storyElements.length).toBeGreaterThan(1);
    });
  });
});