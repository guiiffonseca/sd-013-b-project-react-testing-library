import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../utilities/renderWithRouter';

describe('Teste o componente NotFound', () => {
  test('Teste se página contém um h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(/Pikachu crying/);
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
