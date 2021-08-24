import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa se o component NotFound contem informações sobre a Pokédex.', () => {
  it('Se a página contem um Heading h2 com o texto Not Found.', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Se a página contem uma imagem com um SRC especifico.', () => {
    renderWithRouter(<NotFound />);

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(/Pikachu/i);
    expect(img).toHaveAttribute('src', url);
  });
});
