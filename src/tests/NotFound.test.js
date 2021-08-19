import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './utils/renderWithRouter';
import { NotFound } from '../components';

describe('Teste componente NotFound', () => {
  it('Verifica se a página contém o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);

    const imgUrlNotFound = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgPikachuAlt = 'Pikachu crying because the page requested was not found';

    const titleText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(titleText).toBeInTheDocument();

    const imgNotFound = screen.getByAltText(imgPikachuAlt);
    expect(imgNotFound).toHaveAttribute('src', imgUrlNotFound);
    expect(imgNotFound).toBeInTheDocument();
  });

});
