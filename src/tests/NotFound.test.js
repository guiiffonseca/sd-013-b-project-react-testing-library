import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Página NotFound funciona corretamente', () => {
  it('Página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const notFoundMessage = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' },
      { level: 2 });
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('Página mostra imagem específica', () => {
    renderWithRouter(<NotFound />);

    const cryingPikachu = screen.getByRole('img', { name: /Pikachu crying/ });
    expect(cryingPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
