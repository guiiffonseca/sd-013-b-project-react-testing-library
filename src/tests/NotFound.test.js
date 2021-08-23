import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  test('Teste se página contém um heading h2 com o texto certo', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', { level: 2 }).textContent)
      .toBe('Page requested not found 😭');
  });
  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByAltText(/crying/i).src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
