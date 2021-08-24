import React from 'react';

import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Test the component <NotFound />', () => {
  // Instead of using the render function in every "it", I can refactor by using this function
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('display "No favorite pokemon found", if there are no favorites', () => {
    // Get the element using RegEx (Flag i: Case insensitive):
    const heading = screen.getByText(/Page requested not found/i);

    // Test heading element:
    expect(heading).toBeInTheDocument();
  });

  it('Test if the page shows an img element', () => {
    // Get the image element:
    const image = screen.getByAltText(/Pikachu crying because the page requested was/i);

    // Expect the source to be:
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
