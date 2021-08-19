import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste <NotFound.js />', () => {
  test('Verifica se renderiza um h2 na página', () => {
    renderWithRouter(<NotFound />);

    const headerText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(headerText).toBeInTheDocument();
  });

  test('Verifica se mostra a imagem na página', () => {
    renderWithRouter(<NotFound />);

    const pikachuImg = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(pikachuImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
