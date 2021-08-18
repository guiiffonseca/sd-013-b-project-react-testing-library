import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  test('verifica se a página contém um h2 com o texto Page requested not found 😭', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/,
      }),
    ).toBeInTheDocument();
  });

  test('verifica se a página contém a imagem especificada', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const pikachuGif = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(pikachuGif).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
    expect(pikachuGif).toBeInTheDocument();
  });
});
