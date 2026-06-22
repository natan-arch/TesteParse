import React from 'react';
import { render, container } from '@testing-library/react';
import Navbar from './Navbar';

const ICON_CLASS_NAMES = [
  'fas fa-search',
  'fas fa-home',
  'fas fa-location-arrow',
  'far fa-compass',
  'far fa-heart',
  'far fa-circle',
];

describe('Navbar', () => {
  let renderedContainer;

  beforeEach(() => {
    const { container: c } = render(<Navbar />);
    renderedContainer = c;
  });

  it('renders without crashing', () => {
    expect(renderedContainer.querySelector('nav')).toBeInTheDocument();
  });

  it('does not render any element with an invalid "class" attribute caused by JSX misuse', () => {
    // Elements with `class` instead of `className` in JSX would produce
    // a warning and potentially broken DOM attribute; querying by
    // actual DOM attribute ensures the fix is in place.
    const allElements = renderedContainer.querySelectorAll('*');
    allElements.forEach((el) => {
      // In React, using `class` instead of `className` results in the
      // attribute being absent or mis-applied; every element that should
      // have a CSS class must expose it via `className` (classList).
      const rawClass = el.getAttribute('class');
      if (rawClass !== null) {
        expect(rawClass.trim().length).toBeGreaterThan(0);
      }
    });
  });

  it('renders the search icon with the correct className', () => {
    const searchIcon = renderedContainer.querySelector('.fas.fa-search');
    expect(searchIcon).toBeInTheDocument();
  });

  it('renders the home icon with the correct className', () => {
    const homeIcon = renderedContainer.querySelector('.fas.fa-home');
    expect(homeIcon).toBeInTheDocument();
  });

  it('renders the location-arrow icon with the correct className', () => {
    const locationIcon = renderedContainer.querySelector('.fas.fa-location-arrow');
    expect(locationIcon).toBeInTheDocument();
  });

  it('renders the compass icon with the correct className', () => {
    const compassIcon = renderedContainer.querySelector('.far.fa-compass');
    expect(compassIcon).toBeInTheDocument();
  });

  it('renders the heart icon with the correct className', () => {
    const heartIcon = renderedContainer.querySelector('.far.fa-heart');
    expect(heartIcon).toBeInTheDocument();
  });

  it('renders the circle icon with the correct className', () => {
    const circleIcon = renderedContainer.querySelector('.far.fa-circle');
    expect(circleIcon).toBeInTheDocument();
  });

  it('renders all expected icons', () => {
    ICON_CLASS_NAMES.forEach((iconClass) => {
      const selector = iconClass
        .split(' ')
        .map((c) => `.${c}`)
        .join('');
      expect(renderedContainer.querySelector(selector)).toBeInTheDocument();
    });
  });

  it('renders nav structural elements with correct classNames', () => {
    expect(renderedContainer.querySelector('.leftNav')).toBeInTheDocument();
    expect(renderedContainer.querySelector('.midNav')).toBeInTheDocument();
    expect(renderedContainer.querySelector('.rightNav')).toBeInTheDocument();
  });

  it('renders the instagram logo image', () => {
    const logo = renderedContainer.querySelector('.logo');
    expect(logo).toBeInTheDocument();
    expect(logo.tagName.toLowerCase()).toBe('img');
  });

  it('renders the search input inside midNav', () => {
    const midNav = renderedContainer.querySelector('.midNav');
    expect(midNav).toBeInTheDocument();
    const searchInput = midNav.querySelector('input[type="search"]');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders exactly five navigation icons inside rightNav', () => {
    const rightNav = renderedContainer.querySelector('.rightNav');
    expect(rightNav).toBeInTheDocument();
    const icons = rightNav.querySelectorAll('i');
    expect(icons).toHaveLength(5);
  });

  it('does not have any <i> element without a className', () => {
    // Every icon must carry its Font Awesome classes; an empty className
    // would indicate `class` was used instead of `className` and React
    // silently dropped it.
    const icons = renderedContainer.querySelectorAll('i');
    icons.forEach((icon) => {
      expect(icon.className.trim().length).toBeGreaterThan(0);
    });
  });
});