import React from 'react';
import { screen } from '@testing-library/react';
import RouterMemory from './RouterMemory';
import NotFound from '../components/NotFound';

describe('Requisito 4 NotFound', () => {
  test('Verifica se há um h2 com o texto "Page requested not found 😭"', () => {
    RouterMemory(<NotFound />);

    const header = screen.getByRole('heading', { level: 2 });
    expect(header.textContent).toBe('Page requested not found 😭');
  });

  test('página possui uma imagem', () => {
    RouterMemory(<NotFound />);

    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image).toBeInTheDocument();
  });
});
