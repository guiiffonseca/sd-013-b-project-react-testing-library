import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  it('Testa se existe um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });

    expect(notFound).toBeInTheDocument();
  });

  it('Testa se a página mostra o gif apropriado', () => {
    renderWithRouter(<NotFound />);
    const gif = screen.getByAltText(/Pikachu crying/);

    expect(gif.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
