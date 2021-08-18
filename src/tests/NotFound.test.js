import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testar o componente NotFound', () => {
  test('Testar se página contém um h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('Testar se página mostra a imagem do pikachu', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying /);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
