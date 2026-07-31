import React from 'react';
import { render, screen } from '@testing-library/react';
import Story from './Story';

jest.mock('./StoryElement', () => {
  const MockStoryElement = ({ name, src }) => (
    <div data-testid="story-element" data-name={name} data-src={src} />
  );
  MockStoryElement.displayName = 'MockStoryElement';
  return MockStoryElement;
});

describe('Story', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Story />);
    });

    it('renders a story container element', () => {
      const { container } = render(<Story />);
      expect(container.firstChild).not.toBeNull();
    });

    it('renders at least one StoryElement', () => {
      render(<Story />);
      const storyElements = screen.getAllByTestId('story-element');
      expect(storyElements.length).toBeGreaterThan(0);
    });

    it('renders multiple StoryElements', () => {
      render(<Story />);
      const storyElements = screen.getAllByTestId('story-element');
      expect(storyElements.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('StoryElement composition', () => {
    it('passes a name prop to each StoryElement', () => {
      render(<Story />);
      const storyElements = screen.getAllByTestId('story-element');
      storyElements.forEach((element) => {
        expect(element).toHaveAttribute('data-name');
        expect(element.getAttribute('data-name')).not.toBe('');
      });
    });

    it('passes a src prop to each StoryElement', () => {
      render(<Story />);
      const storyElements = screen.getAllByTestId('story-element');
      storyElements.forEach((element) => {
        expect(element).toHaveAttribute('data-src');
      });
    });

    it('renders a unique name for each StoryElement', () => {
      render(<Story />);
      const storyElements = screen.getAllByTestId('story-element');
      const names = storyElements.map((el) => el.getAttribute('data-name'));
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });
  });
});