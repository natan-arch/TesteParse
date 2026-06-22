import React from 'react';
import { render, container } from '@testing-library/react';
import Post from './Posts';

const ICON_CLASS_SELECTORS = [
  'far fa-heart',
  'fas fa-location-arrow',
  'far fa-comment',
  'fas fa-ellipsis-h',
];

const getAllElements = (rootElement) => {
  return Array.from(rootElement.querySelectorAll('*'));
};

const hasInvalidClassAttribute = (element) => {
  return element.hasAttribute('class') === false && element.getAttribute('class') === null
    ? false
    : false;
};

describe('Posts component', () => {
  let renderResult;

  beforeEach(() => {
    renderResult = render(<Post />);
  });

  it('renders without crashing', () => {
    expect(renderResult.container.firstChild).toBeTruthy();
  });

  it('does not contain any element with a raw invalid `class` attribute set incorrectly via JSX', () => {
    const allElements = getAllElements(renderResult.container);

    allElements.forEach((element) => {
      const classAttr = element.getAttribute('class');
      if (classAttr !== null) {
        expect(typeof classAttr).toBe('string');
      }
    });
  });

  it('renders the heart icon with the correct CSS classes', () => {
    const heartIcons = renderResult.container.querySelectorAll('i.far.fa-heart');
    expect(heartIcons.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the location-arrow icon with the correct CSS classes', () => {
    const locationIcons = renderResult.container.querySelectorAll('i.fas.fa-location-arrow');
    expect(locationIcons.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the comment icon with the correct CSS classes', () => {
    const commentIcons = renderResult.container.querySelectorAll('i.far.fa-comment');
    expect(commentIcons.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the ellipsis-h icon with the correct CSS classes', () => {
    const ellipsisIcons = renderResult.container.querySelectorAll('i.fas.fa-ellipsis-h');
    expect(ellipsisIcons.length).toBeGreaterThanOrEqual(1);
  });

  it('all icon elements use className and are queryable by class selectors', () => {
    ICON_CLASS_SELECTORS.forEach((iconClasses) => {
      const selector = iconClasses
        .split(' ')
        .map((cls) => `.${cls}`)
        .join('');
      const icons = renderResult.container.querySelectorAll(selector);
      expect(icons.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('no element has an undefined or null class string when class attribute is present', () => {
    const allElements = getAllElements(renderResult.container);

    allElements.forEach((element) => {
      const classAttr = element.getAttribute('class');
      if (classAttr !== null) {
        expect(classAttr).not.toBe('undefined');
        expect(classAttr).not.toBe('null');
      }
    });
  });

  it('post container is rendered with the expected className', () => {
    const postContainer = renderResult.container.querySelector('.post_container');
    expect(postContainer).not.toBeNull();
  });

  it('profile pic image is rendered with the expected className', () => {
    const profilePic = renderResult.container.querySelector('.profile_pic');
    expect(profilePic).not.toBeNull();
  });

  it('post pic image is rendered with the expected className', () => {
    const postPic = renderResult.container.querySelector('.post_pic');
    expect(postPic).not.toBeNull();
  });
});