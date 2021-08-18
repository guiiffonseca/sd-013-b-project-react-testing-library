import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('Requirement 3 - Test the favorite pokémons page', () => {
  it('should no favorite pokemons found text', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('should the favorite pokemon cards render', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const pokemonCard = screen.getAllByTestId('pokemon-name');
    expect(pokemonCard.length).not.toBe(0);
  });
});
