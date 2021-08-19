import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Test 3 - Testing Favorite Pokemons ', () => {
  it('Test if "No favorite pokemon found" is shown', () => {
    renderWithRouter(<FavoritePokemons />);

    const pokemonNotFound = screen.getByText('No favorite pokemon found');
    expect(pokemonNotFound).toBeInTheDocument();
  });

  it('Test if favorites pokemons are on the screen', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const favoritePokemons = screen.getByTestId('pokemon-name');
    expect(favoritePokemons).toBeInTheDocument();
    expect(favoritePokemons.length).not.toBe(0);
  });
});
