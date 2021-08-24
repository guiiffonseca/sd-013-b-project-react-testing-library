import React from 'react';

import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import NotFound from '../components/NotFound';

describe('Test the component <NotFound />', () => {
  it('display "No favorite pokemon found", if there are no favorites', () => {
    // Render the component in the virtual browser:
    renderWithRouter(<NotFound />);

    // Get the element using RegEx (Flag i: Case insensitive):
    const heading = screen.getByText(/Page requested not found/i);

    // Test heading element:
    expect(heading).toBeInTheDocument();
  });

  it('Test if the page shows', () => {
    // Render the component:
    renderWithRouter(<NotFound />);

    // Get the image element:
    const image = screen.getByAltText(/Pikachu crying because the page requested was/i);

    // Expect the source to be:
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
