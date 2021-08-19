import React from 'react';
import { render, screen, within } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('Testando o componente <NotFound.js />', () => {
  /* test('Teste se página contém um heading h2 com o texto "Page requested not found 😭"',
    () => {
      render(
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>,
      );
      const imgs = screen.getAllByRole('img');
      const emoji = imgs[0];
      console.log(emoji);
      const pageNotFoundText = screen.getByRole('heading', {
        level: 2,
        name: `Page requested not found ${imgs[0].getAttribute(children)}`,
      });

      expect(pageNotFoundText).toBeInTheDocument();
    }); */

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
