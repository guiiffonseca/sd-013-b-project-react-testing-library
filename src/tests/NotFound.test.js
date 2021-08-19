import React from 'react';
import { screen, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('página contém um heading h2 com o texto Page requested not found', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const h2NotFoundPage = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(h2NotFoundPage).toBeInTheDocument();
  });

  test('página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const imgNotFoundPage = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(imgNotFoundPage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
