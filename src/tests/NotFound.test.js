import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testa componente Not Found', () => {
  test('testa se a pagina contem um h2 com o texto Page requested not found', () => {
    render(<NotFound />);

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(notFound).toBeInTheDocument();
  });
  test('teste se a pagina mostra a imagem', () => {
    render(<NotFound />);

    const notFoundImg = screen.getByAltText(/Pikachu crying/);
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
