import { screen, render } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('Teste Page requested not found', () => {
  test('Teste se página contém um heading h2', () => {
    render(<NotFound />);
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('Teste se há uma imagem na tela ', () => {
    render(<NotFound />);
    const imagePokedex = screen.getByAltText(/Pikachu crying because/i);
    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
