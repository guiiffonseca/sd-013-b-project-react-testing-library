import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Teste o arquivo NotFound.js', () => {
  it('Testa se página contém um h2 com  o texto Page requested not found;', () => {
    renderWithRouter(<NotFound />);
    const infos = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(infos).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<NotFound />);
    const img = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
