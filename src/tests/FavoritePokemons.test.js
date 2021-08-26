import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';

import pokemons from '../data';

describe(('FavoritePokemons.js tests'), () => {
  test('Testa se há um texto se não houver pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const favoritesNotFoundText = screen.getByText('No favorite pokemon found');
    expect(favoritesNotFoundText).toBeInTheDocument();
  });

  test('Testa se há cards se houver pokemons favoritos', () => {
    const DRAGONAIR_ID = 148;

    const favoritePokemon = pokemons.filter(
      ({ id }) => id === DRAGONAIR_ID,
    );

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);

    const dragonair = screen.getByText('Dragonair');

    expect(dragonair).toBeInTheDocument();
  });
});
