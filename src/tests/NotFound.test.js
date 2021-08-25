import React from 'react';
import { screen } from '@testing-library/react';

import NotFound from '../components/NotFound';
import renderWithRouter from '../utils/renderWithRouter';

describe('NotFound.js tests', () => {
  test('If header has "Page requested not found"😭', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
  test('Page has image', () => {
    renderWithRouter(<NotFound />);
    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
