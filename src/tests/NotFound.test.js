import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente NotFound.js', () => {
  test('Testa se a página contém um h2', () => {
    const altIMG = 'Pikachu crying because the page requested was not found';
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    const imgNotFound = screen.getByAltText(altIMG);
    expect(notFoundText).toBeInTheDocument();
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
