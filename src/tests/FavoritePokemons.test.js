import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testando o componente Favorite Pokémons', () => {
  test('É exibido "No favorite pokemon found" se não tiver pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemonFound = screen.getByText(/No favorite pokemon found/i);
    expect(noPokemonFound).toBeInTheDocument();
  });
  test('Se a página mostra os pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favPokemons = screen.getAllByText(/Average weight/i);
    expect(favPokemons.length).not.toBe(0);
  });
});
