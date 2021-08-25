import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('NotFound test', () => {
  test('Deve conter na página o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Deve ser mostrado na página uma imagem do pikachu chorando', () => {
    renderWithRouter(<NotFound />);
    const imgCode = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(/Pikachu crying because/i);
    expect(img).toHaveAttribute('src', imgCode);
  });
});
