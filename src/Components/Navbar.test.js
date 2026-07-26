import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Navbar />);
    });

    it('renders the instagram logo image', () => {
      render(<Navbar />);
      expect(screen.getByAltText(/insta nav logo/i)).toBeInTheDocument();
    });

    it('renders the search input', () => {
      render(<Navbar />);
      expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });

    it('renders the search input with type search', () => {
      render(<Navbar />);
      expect(screen.getByPlaceholderText(/search/i)).toHaveAttribute('type', 'search');
    });

    it('renders a nav element', () => {
      render(<Navbar />);
      expect(document.querySelector('nav')).toBeInTheDocument();
    });

    it('renders a horizontal rule separator', () => {
      render(<Navbar />);
      expect(document.querySelector('hr')).toBeInTheDocument();
    });
  });

  describe('navigation icons', () => {
    it('renders the home icon', () => {
      render(<Navbar />);
      expect(document.querySelector('.fa-home')).toBeInTheDocument();
    });

    it('renders the location arrow icon', () => {
      render(<Navbar />);
      expect(document.querySelector('.fa-location-arrow')).toBeInTheDocument();
    });

    it('renders the compass icon', () => {
      render(<Navbar />);
      expect(document.querySelector('.fa-compass')).toBeInTheDocument();
    });

    it('renders the heart icon', () => {
      render(<Navbar />);
      expect(document.querySelector('.fa-heart')).toBeInTheDocument();
    });

    it('renders the circle icon', () => {
      render(<Navbar />);
      expect(document.querySelector('.fa-circle')).toBeInTheDocument();
    });
  });

  describe('nav sections', () => {
    it('renders the left nav section', () => {
      render(<Navbar />);
      expect(document.querySelector('.leftNav')).toBeInTheDocument();
    });

    it('renders the mid nav section', () => {
      render(<Navbar />);
      expect(document.querySelector('.midNav')).toBeInTheDocument();
    });

    it('renders the right nav section', () => {
      render(<Navbar />);
      expect(document.querySelector('.rightNav')).toBeInTheDocument();
    });

    it('renders five navigation list items in the right nav', () => {
      render(<Navbar />);
      const rightNav = document.querySelector('.rightNav');
      const items = rightNav.querySelectorAll('li');
      expect(items).toHaveLength(5);
    });
  });
});