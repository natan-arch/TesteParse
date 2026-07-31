import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBoxImage from './SideBoxImage';

describe('SideBoxImage', () => {
  it('renders without crashing', () => {
    const { container } = render(<SideBoxImage />);
    expect(container).toBeInTheDocument();
  });

  it('displays an image', () => {
    render(<SideBoxImage />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});