import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe(('FavoritePokemons.js tests'), () => {
  test('Testa se há um texto se não houver pokemons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const favoritesNotFoundText = screen.getByText('No favorite pokemon found');
    expect(favoritesNotFoundText).toBeInTheDocument();
  });

  // test('Testa se há cards se houver pokemons favoritos', () => {
  //   Terminar
  // });
});
