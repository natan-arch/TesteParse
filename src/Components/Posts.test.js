import React from 'react';
import { render, screen } from '@testing-library/react';
import Post from './Posts';

const DEFAULT_PROPS = {
  author: 'john_doe',
  imageUrl: 'https://example.com/photo.jpg',
  description: 'A beautiful sunset over the mountains.',
};

describe('Post', () => {
  describe('rendering', () => {
    it('renders without crashing when given required props', () => {
      render(<Post {...DEFAULT_PROPS} />);
    });

    it('renders without crashing when given no props', () => {
      render(<Post />);
    });
  });

  describe('author prop', () => {
    it('displays the author name when provided', () => {
      render(<Post {...DEFAULT_PROPS} />);
      expect(screen.getByText(DEFAULT_PROPS.author)).toBeInTheDocument();
    });

    it('does not throw when author is not provided', () => {
      const { author, ...propsWithoutAuthor } = DEFAULT_PROPS;
      render(<Post {...propsWithoutAuthor} />);
    });

    it('renders a different author name correctly', () => {
      render(<Post {...DEFAULT_PROPS} author="jane_smith" />);
      expect(screen.getByText('jane_smith')).toBeInTheDocument();
    });
  });

  describe('imageUrl prop', () => {
    it('renders an image with the provided imageUrl as src', () => {
      render(<Post {...DEFAULT_PROPS} />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', DEFAULT_PROPS.imageUrl);
    });

    it('does not throw when imageUrl is not provided', () => {
      const { imageUrl, ...propsWithoutImage } = DEFAULT_PROPS;
      render(<Post {...propsWithoutImage} />);
    });

    it('renders an updated imageUrl when a different value is given', () => {
      const altUrl = 'https://example.com/other.jpg';
      render(<Post {...DEFAULT_PROPS} imageUrl={altUrl} />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', altUrl);
    });
  });

  describe('description prop', () => {
    it('displays the description text when provided', () => {
      render(<Post {...DEFAULT_PROPS} />);
      expect(screen.getByText(DEFAULT_PROPS.description)).toBeInTheDocument();
    });

    it('does not throw when description is not provided', () => {
      const { description, ...propsWithoutDescription } = DEFAULT_PROPS;
      render(<Post {...propsWithoutDescription} />);
    });

    it('renders a different description correctly', () => {
      const altDescription = 'City lights at midnight.';
      render(<Post {...DEFAULT_PROPS} description={altDescription} />);
      expect(screen.getByText(altDescription)).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('renders an empty description without crashing', () => {
      render(<Post {...DEFAULT_PROPS} description="" />);
    });

    it('renders an empty author without crashing', () => {
      render(<Post {...DEFAULT_PROPS} author="" />);
    });

    it('renders an empty imageUrl without crashing', () => {
      render(<Post {...DEFAULT_PROPS} imageUrl="" />);
    });

    it('does not display a different author than the one provided', () => {
      render(<Post {...DEFAULT_PROPS} author="expected_author" />);
      expect(screen.queryByText('unexpected_author')).not.toBeInTheDocument();
    });
  });
});