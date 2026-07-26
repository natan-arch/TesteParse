import React from 'react';
import { render, screen } from '@testing-library/react';
import StoryElement from './StoryElement';

const DEFAULT_PROPS = {
  image: 'https://example.com/avatar.jpg',
  username: 'john_doe',
};

describe('StoryElement', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<StoryElement {...DEFAULT_PROPS} />);
    });

    it('displays the story image', () => {
      render(<StoryElement {...DEFAULT_PROPS} />);
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', DEFAULT_PROPS.image);
    });

    it('displays the username', () => {
      render(<StoryElement {...DEFAULT_PROPS} />);
      expect(screen.getByText(DEFAULT_PROPS.username)).toBeInTheDocument();
    });
  });

  describe('image alt text', () => {
    it('uses the username as alt text for the story image', () => {
      render(<StoryElement {...DEFAULT_PROPS} />);
      expect(screen.getByRole('img')).toHaveAttribute('alt', DEFAULT_PROPS.username);
    });
  });

  describe('edge cases', () => {
    it('renders with an empty username without crashing', () => {
      render(<StoryElement image={DEFAULT_PROPS.image} username="" />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders with a different username correctly', () => {
      const username = 'jane_smith';
      render(<StoryElement image={DEFAULT_PROPS.image} username={username} />);
      expect(screen.getByText(username)).toBeInTheDocument();
    });
  });
});