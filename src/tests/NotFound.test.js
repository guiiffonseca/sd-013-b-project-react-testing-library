import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Test 4 - Testing Not Found', () => {
  it('Test if Page requested not found is shown', () => {
    renderWithRouter(<NotFound />);

    const textNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(textNotFound).toBeInTheDocument();
  });

  it('Test if the page contains a pikachu crying gif', () => {
    renderWithRouter(<NotFound />);

    const pikachuGif = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(pikachuGif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
