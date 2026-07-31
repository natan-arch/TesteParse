import React from 'react';
import { render, screen } from '@testing-library/react';
import Post from './Posts';

describe('Post', () => {
  it('renders without crashing', () => {
    render(<Post />);
  });

  it('displays an image with alt text post_pic', () => {
    render(<Post />);
    expect(screen.getByAltText('post_pic')).toBeInTheDocument();
  });

  it('displays the author name', () => {
    render(<Post />);
    expect(screen.getByText(/ayush/i)).toBeInTheDocument();
  });
});