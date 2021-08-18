import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('este o componente <NotFound.js />', () => {
  test('Página contém um heading h2 com o texto Page requested not found', () => {
    // renderiza:
    renderWithRouter(<NotFound />);
    // Acessa:
    const heading = screen.getByText(/Page requested not found/i);
    // testa:
    expect(heading).toBeInTheDocument();
  });

  test('Teste se página mostra determinada  imagem', () => {
    // renderiza:
    renderWithRouter(<NotFound />);
    // Acessa:
    const image = screen.getByAltText(/Pikachu crying because the page requested was/i);
    // testes:
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
