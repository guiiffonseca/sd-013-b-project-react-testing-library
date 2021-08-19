import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste FavoritePokemons.js', () => {
  test('Se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemon={ [] } />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
