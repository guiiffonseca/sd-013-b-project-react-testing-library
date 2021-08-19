import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente NotFound', () => {
  test('Teste se contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const mensagem = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(mensagem).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getAllByRole('img');
    expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
