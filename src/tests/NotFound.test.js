import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { NotFound } from '../components';

describe('Test NotFound.js', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found.', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Testando se a página mostra a imagem.', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const pikachuCryingImage = screen.getByAltText(/pikachu crying/i);
    expect(pikachuCryingImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
