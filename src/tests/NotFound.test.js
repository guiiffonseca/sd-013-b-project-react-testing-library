import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../Uteis/renderWithRouter';
import NotFound from '../components/NotFound';

// Recebi ajuda do Gênesis Henriques, Matheus Figueiredo, Gabriel Ribeiro e Gustavo Alves para desenvolver esse projeto https://github.com/GenesisHenriques, https://github.com/mathfigueiredo, https://github.com/Gribeir0, https://github.com/gustavoalves23

describe('Testa o component NotFound', () => {
  it('', () => {
    renderWithRouter(<NotFound />);
    const textH2 = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(textH2).toHaveTextContent('Page requested not found');
  });

  it('', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
