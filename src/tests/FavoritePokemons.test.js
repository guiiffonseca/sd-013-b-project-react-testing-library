import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('FavoritePokemons test', () => {
  test('página possui texto "No favorite pokemon found" se não tiver favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const favoriteNotFound = screen.getByText('No favorite pokemon found');
    expect(favoriteNotFound).toBeInTheDocument();
  });

//  continuar depois
});
