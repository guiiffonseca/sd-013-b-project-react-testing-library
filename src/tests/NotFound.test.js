import React from 'react';
import { screen } from '@testing-library/react';

import NotFound from '../components/NotFound';
import renderWithRouter from './utils/renderWithRouter';

describe('NotFound.js tests', () => {
  test('The page contains a header with the text "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFoundHeader = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(notFoundHeader).toBeInTheDocument();
  });
  test('The page contains a Pikachu crying gif', () => {
    renderWithRouter(<NotFound />);

    const pikachuGif = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(pikachuGif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
