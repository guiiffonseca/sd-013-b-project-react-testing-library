import { screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o FavoritePokemons.js', () => {
  test('Testa se é exibido a msm No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados', () => {
    const favoritePokemons = [
      pokemons[0],
      pokemons[1],
    ];

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(favoritePokemons.length);
    pokemonName.forEach((pokemon, indice) => {
      expect(pokemon).toHaveTextContent(favoritePokemons[indice].name);
    });
  });
});
