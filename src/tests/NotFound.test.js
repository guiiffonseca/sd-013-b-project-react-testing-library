import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente NotFound.js', () => {
  test('Página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    expect(screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i }))
      .toBeInTheDocument();
  });
  test('Página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(/rying because the page requested was not found/i);
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
