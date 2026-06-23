import React from 'react';
import { render } from '@testing-library/react';
import Post from './Posts';

describe('Posts', () => {
  let container;

  beforeEach(() => {
    const { container: c } = render(<Post />);
    container = c;
  });

  it('renders without crashing', () => {
    expect(container.querySelector('.post_container')).toBeInTheDocument();
  });

  it('does not render <li> elements as direct children of a <div>', () => {
    const allListItems = container.querySelectorAll('li');

    allListItems.forEach((li) => {
      const parent = li.parentElement;
      expect(parent.tagName).not.toBe('DIV');
    });
  });

  it('wraps action <li> elements inside a <ul>', () => {
    const allListItems = container.querySelectorAll('li');

    allListItems.forEach((li) => {
      const parent = li.parentElement;
      expect(['UL', 'OL']).toContain(parent.tagName);
    });
  });

  it('renders action icons inside a <ul>', () => {
    const heartIcon = container.querySelector('.far.fa-heart');
    const locationIcon = container.querySelector('.fas.fa-location-arrow');
    const commentIcon = container.querySelector('.far.fa-comment');
    const ellipsisIcon = container.querySelector('.fas.fa-ellipsis-h');

    [heartIcon, locationIcon, commentIcon, ellipsisIcon].forEach((icon) => {
      expect(icon).toBeInTheDocument();
      const li = icon.closest('li');
      expect(li).not.toBeNull();
      expect(li.parentElement.tagName).toMatch(/^(UL|OL)$/);
    });
  });

  it('contains no orphan <li> elements outside of <ul> or <ol>', () => {
    const orphanListItems = container.querySelectorAll('div > li');
    expect(orphanListItems.length).toBe(0);
  });
});