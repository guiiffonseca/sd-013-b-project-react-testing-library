import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../utils/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  test('A página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFoundText).toBeInTheDocument();
  });
  it('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const notFoundImage = screen.getByRole('img', {
      src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
