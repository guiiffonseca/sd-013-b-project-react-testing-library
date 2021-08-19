import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste NotFound.js', () => {
  test('Se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem X', () => {
    renderWithRouter(<NotFound />);
    const image = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
