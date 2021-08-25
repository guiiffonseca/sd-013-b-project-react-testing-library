import React from 'react';
import { getByText, render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';
import pokemons from '../data';

describe('Teste o componente NotFound', () => {
  test('Se há um h2 com o texto Page requested not found 😭', () => {
    render(<NotFound />);
    const h2 = screen.getByText('Page requested not found');
    expect(h2).toBeInTheDocument();
  });

  test('se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const name = 'Pikachu crying because the page requested was not found';
    const img = screen.getByRole('img', { name });
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
