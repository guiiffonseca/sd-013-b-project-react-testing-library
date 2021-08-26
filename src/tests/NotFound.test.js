import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound />', () => {
  test('A página contém um h2 com o texto "Page requested not found"', () => {
    render(<NotFound />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });
    expect(title).toBeInTheDocument();
  });

  test('A página exibe uma imagem', () => {
    render(<NotFound />);
    const image = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
