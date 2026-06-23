import React from 'react';
import { render } from '@testing-library/react';
import SideBox from './SideBox';

const EXPECTED_ALT_TEXT = 'Foto de perfil de Jugesh Raghav';
const MAIN_IMAGE_CLASS = 'sideBox_main_image';

describe('SideBox', () => {
  let renderedContainer;

  beforeEach(() => {
    const { container } = render(<SideBox />);
    renderedContainer = container;
  });

  it('renders the main image with the correct accessibility alt text', () => {
    const mainImage = renderedContainer.querySelector(`.${MAIN_IMAGE_CLASS}`);

    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('alt', EXPECTED_ALT_TEXT);
  });
});