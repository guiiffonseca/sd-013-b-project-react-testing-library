import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const NotFoundHeading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(NotFoundHeading).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const altText = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(altText);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
