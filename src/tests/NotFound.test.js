import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../utils/renderWithRouter';

// Codigo refeito depois de fazer um CR no projeto do Lucas Caribé
describe('Testando NotFound.js', () => {
  test('a página deve conter um heading h2 com um texto específico', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByText(/Page requested not found/i);

    expect(notFoundText).toBeInTheDocument();
  });

  test('se página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);
    const imageError = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(imageError.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
