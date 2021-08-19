// npx stryker run ./stryker/FavoritePokemons.conf.json

import React from 'react';
import pokemons from '../data';
import FavoritePokemons from '../components/FavoritePokemons';
import funcGetByText from '../services/funcGetByText';
import funcGetByTestId from '../services/funcGetByTestId';

describe('3- Test component <FavoritePokemons/>', () => {
  test('has no favorite pokemon return a test \'No favorite pokemon found\'', () => {
    funcGetByText(<FavoritePokemons />, 'No favorite pokemon found');
  });

  test('has favorite pokemon, shows then all', () => {
    funcGetByTestId(
      <FavoritePokemons pokemons={ pokemons } />,
      'pokemon-name',
      'length',
      ['.toBeGreaterThan'],
      0,
      'all',
    );
  });
});
