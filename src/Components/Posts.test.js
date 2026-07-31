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
    it('renders without crashing when given valid props', () => {
      render(<Post {...DEFAULT_PROPS} />);
    });

    it('renders without crashing when given no props', () => {
      render(<Post />);
    });
  });

  describe('author prop', () => {
    it('displays the author name passed via props', () => {
      render(<Post {...DEFAULT_PROPS} />);
      expect(screen.getByText(DEFAULT_PROPS.author)).toBeInTheDocument();
    });

    it('displays a different author when a different value is passed', () => {
      render(<Post {...DEFAULT_PROPS} author="jane_smith" />);
      expect(screen.getByText('jane_smith')).toBeInTheDocument();
    });

    it('does not display the default author when overridden', () => {
      render(<Post {...DEFAULT_PROPS} author="jane_smith" />);
      expect(screen.queryByText(DEFAULT_PROPS.author)).not.toBeInTheDocument();
    });
  });

  describe('imageUrl prop', () => {
    it('renders an image with the src set to the provided imageUrl', () => {
      render(<Post {...DEFAULT_PROPS} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', DEFAULT_PROPS.imageUrl);
    });

    it('renders an image with an updated src when a different imageUrl is passed', () => {
      const alternateUrl = 'https://example.com/other-photo.jpg';
      render(<Post {...DEFAULT_PROPS} imageUrl={alternateUrl} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', alternateUrl);
    });
  });

  describe('description prop', () => {
    it('displays the description text passed via props', () => {
      render(<Post {...DEFAULT_PROPS} />);
      expect(screen.getByText(DEFAULT_PROPS.description)).toBeInTheDocument();
    });

    it('displays a different description when a different value is passed', () => {
      const altDescription = 'City lights at midnight.';
      render(<Post {...DEFAULT_PROPS} description={altDescription} />);
      expect(screen.getByText(altDescription)).toBeInTheDocument();
    });
  });

  describe('reusability with fully distinct data sets', () => {
    it('renders each post independently with its own data', () => {
      const firstPost = {
        author: 'user_one',
        imageUrl: 'https://example.com/img1.jpg',
        description: 'First post description.',
      };
      const secondPost = {
        author: 'user_two',
        imageUrl: 'https://example.com/img2.jpg',
        description: 'Second post description.',
      };

      const { unmount } = render(<Post {...firstPost} />);
      expect(screen.getByText(firstPost.author)).toBeInTheDocument();
      expect(screen.getByText(firstPost.description)).toBeInTheDocument();
      unmount();

      render(<Post {...secondPost} />);
      expect(screen.getByText(secondPost.author)).toBeInTheDocument();
      expect(screen.getByText(secondPost.description)).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('renders an empty author without crashing', () => {
      render(<Post {...DEFAULT_PROPS} author="" />);
    });

    it('renders an empty description without crashing', () => {
      render(<Post {...DEFAULT_PROPS} description="" />);
    });

    it('renders when imageUrl is an empty string without crashing', () => {
      render(<Post {...DEFAULT_PROPS} imageUrl="" />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '');
    });
  });
});