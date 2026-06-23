import React from 'react';
import { render } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  let renderedContainer;

  beforeEach(() => {
    const { container } = render(<Navbar />);
    renderedContainer = container;
  });

  it('renders without crashing', () => {
    expect(renderedContainer.querySelector('nav')).toBeInTheDocument();
  });

  it('does not render any element with an invalid "class" attribute caused by JSX misuse', () => {
    const allElements = renderedContainer.querySelectorAll('*');
    allElements.forEach((el) => {
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

  it('renders the logo img as a child of a li inside ul.leftNav — valid HTML structure (issue #12)', () => {
    const leftNav = renderedContainer.querySelector('ul.leftNav');
    expect(leftNav).toBeInTheDocument();

    const liInsideLeftNav = leftNav.querySelector('li');
    expect(liInsideLeftNav).toBeInTheDocument();

    const logoImg = liInsideLeftNav.querySelector('img.logo');
    expect(logoImg).toBeInTheDocument();
  });

  it('does not render img.logo as a direct child of ul.leftNav', () => {
    const leftNav = renderedContainer.querySelector('ul.leftNav');
    expect(leftNav).toBeInTheDocument();

    // A direct child img of ul is invalid HTML; it must be wrapped in li
    const directImgChildren = Array.from(leftNav.children).filter(
      (child) => child.tagName.toLowerCase() === 'img'
    );
    expect(directImgChildren).toHaveLength(0);
  });

  it('renders a search input inside ul.midNav', () => {
    const midNav = renderedContainer.querySelector('ul.midNav');
    expect(midNav).toBeInTheDocument();

    const searchInput = midNav.querySelector('input[type="search"]');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders exactly five action icons inside ul.rightNav', () => {
    const rightNav = renderedContainer.querySelector('ul.rightNav');
    expect(rightNav).toBeInTheDocument();

    const listItems = rightNav.querySelectorAll('li');
    expect(listItems).toHaveLength(5);
  });

  it('renders a horizontal rule after the nav', () => {
    const hr = renderedContainer.querySelector('hr');
    expect(hr).toBeInTheDocument();
  });
});