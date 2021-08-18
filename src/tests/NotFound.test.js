import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderRouter from '../services/renderRouter';

describe('Teste do componente notFound', () => {
  test('Teste se a página contem um heading com o texto page request not found', () => {
    renderRouter(<NotFound />);
    const notFound = screen.getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    renderRouter(<NotFound />);
    const notFoundImage = screen.getByAltText(/Pikachu crying because the page /);
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
