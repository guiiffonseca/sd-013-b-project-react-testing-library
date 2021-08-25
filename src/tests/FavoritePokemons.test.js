import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Favorite test', () => {
  test('A mensagegem "No favorite pokemon found" deve ser exibida na tela', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  test('Deverá aparecer na tela, todos os pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const average = screen.getAllByText(/Average weigh/i);

    const qtdPokemons = 9;

    expect(average).toHaveLength(qtdPokemons);
  });
});
