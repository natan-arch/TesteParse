import React from 'react';
import { render, screen } from '@testing-library/react';
import StoryElement from './StoryElement';

const DEFAULT_PROPS = {
  image: 'https://example.com/avatar.jpg',
  name: 'john_doe',
};

describe('StoryElement', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<StoryElement {...DEFAULT_PROPS} />);
    });

    it('displays the user avatar image', () => {
      render(<StoryElement {...DEFAULT_PROPS} />);
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', DEFAULT_PROPS.image);
    });

    it('displays the username', () => {
      render(<StoryElement {...DEFAULT_PROPS} />);
      expect(screen.getByText(DEFAULT_PROPS.name)).toBeInTheDocument();
    });
  });

  describe('props', () => {
    it('renders the correct image src when a different image is provided', () => {
      const image = 'https://example.com/other-avatar.png';
      render(<StoryElement image={image} name="jane_doe" />);
      expect(screen.getByRole('img')).toHaveAttribute('src', image);
    });

    it('renders the correct username when a different name is provided', () => {
      render(<StoryElement image={DEFAULT_PROPS.image} name="jane_doe" />);
      expect(screen.getByText('jane_doe')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('renders with an empty name without crashing', () => {
      render(<StoryElement image={DEFAULT_PROPS.image} name="" />);
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
    });

    it('renders with an empty image src without crashing', () => {
      render(<StoryElement image="" name={DEFAULT_PROPS.name} />);
      expect(screen.getByText(DEFAULT_PROPS.name)).toBeInTheDocument();
    });
  });
});