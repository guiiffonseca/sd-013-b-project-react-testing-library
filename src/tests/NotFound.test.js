import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { NotFound } from '../components';

describe('Verifica o componente "NotFound.js"', () => {
  test('Pagina contém uma tag "h2" com texto "Page Requested not found"', () => {
    renderWithRouter(<NotFound />);
    const h2TitleText = screen.getByRole('heading', { name: /Page requested no/i });
    expect(h2TitleText).toBeInTheDocument();
  });

  test('Pagina renderiza a imagem selecionada', () => {
    renderWithRouter(<NotFound />);
    const text = /Pikachu crying because the page requested was not found/i;
    const img = screen.getByAltText(text);
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
