import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('Teste se página contém um heading h2 com o texto'
  + 'Page requested not found 😭', () => {
    const heading2 = screen.getByRole('heading',
      { level: 2, name: (content) => content.includes('Page requested not found') });
    expect(heading2).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const textAlt = 'Pikachu crying because the page requested was not found';
    const imagePikachuCrying = screen.getByAltText(textAlt);
    const pikachuGif = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imagePikachuCrying.src).toBe(pikachuGif);
  });
});
