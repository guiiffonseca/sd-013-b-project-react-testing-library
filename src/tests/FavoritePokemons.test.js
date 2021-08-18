import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

test('FavoritePokemons.js tests - No fav pokemon found', () => {
  renderWithRouter(<FavoritePokemons />);
  
});
