import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa o NotFound.js', () => {
  test('Testa se contém um h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    let msg = screen.getByText(/Page requested not found/i);
    expect(msg).toBeInTheDocument();

    msg = screen.getByRole('heading', {
      level: 2,
    });
    expect(msg).toBeInTheDocument();
  });

  test('Testa se página mostra a imagem ', () => {
    renderWithRouter(<NotFound />);
    const elementImg = screen.getAllByRole('img');
    expect(elementImg[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
