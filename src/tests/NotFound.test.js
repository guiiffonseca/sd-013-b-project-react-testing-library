import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { NotFound } from '../components';

describe('4. Teste o componente <NotFound.js />', () => {
  test(`Teste se página contém um heading h2 com o texto:
  "Page requested not found 😭"`, () => {
    renderWithRouter(<NotFound />);

    const notFoundMessage = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFoundMessage).toBeInTheDocument();
  });

  test(`Teste se página mostra a imagem
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    renderWithRouter(<NotFound />);

    const imagemPikachuCry = screen.getByAltText(/not found/i);
    expect(imagemPikachuCry).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
