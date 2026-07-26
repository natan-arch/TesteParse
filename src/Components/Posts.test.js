import React from 'react';
import { render, screen } from '@testing-library/react';
import Post from './Posts';

describe('Post', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Post />);
    });

    it('displays the post image with an accessible alt attribute', () => {
      render(<Post />);
      const postImage = screen.getByAltText(/post/i);
      expect(postImage).toBeInTheDocument();
    });

    it('displays the author name', () => {
      render(<Post />);
      const authorName = screen.getByText(/ayush/i);
      expect(authorName).toBeInTheDocument();
    });
  });
});