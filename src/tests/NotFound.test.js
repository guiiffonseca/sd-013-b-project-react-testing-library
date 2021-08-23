import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente NotFound', () => {
  test('Deveria aparecer um h2 com o texto: Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');

    const h2Text = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(h2Text).toBeInTheDocument();
  });

  test('Deveria exibir um gif na pagina', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');

    const notFoundGif = screen.getByAltText(/pikachu crying/i);

    expect(notFoundGif).toBeInTheDocument();
    expect(notFoundGif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
