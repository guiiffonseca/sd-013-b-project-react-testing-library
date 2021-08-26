import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound test', () => {
  test('página contém o text "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(notFoundText).toBeInTheDocument();
  });

  test('página possui uma imagem', () => {
    renderWithRouter(<NotFound />);

    const notFoundImg = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(notFoundImg).toBeInTheDocument();
  });
});
