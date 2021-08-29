import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente Not Found', () => {
  test('Se a página contém um h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole(
      'heading', { level: 2 },
    )
      .textContent).toBe('Page requested not found 😭');
  });
  test('Se a página possui imagem do Pikachu chorando', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying/i);
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
