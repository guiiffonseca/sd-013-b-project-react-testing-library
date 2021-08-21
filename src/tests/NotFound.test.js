import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('Testando o componente <NotFound.js />', () => {
  test('Testa se existe h2 com o texto "Page requested not found"', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const notFountText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFountText).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const srcImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altImage = 'Pikachu crying because the page requested was not found';
    const imgs = screen.getAllByRole('img');

    expect(imgs[1]).toHaveAttribute('src', srcImage);
    expect(imgs[1]).toHaveAttribute('alt', altImage);
  });
});
