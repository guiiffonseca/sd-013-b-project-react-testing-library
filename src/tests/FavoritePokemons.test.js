import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './utils/RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Teste Favorite Pokemons', () => {
  test('Verifica pokemons na pagina', () => {
    RenderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const FAVORITE_NUMBER = 9;
    const pokeDiv = screen.getAllByText(/Average weight/i);
    const favPokemonsTitle = screen.getByText(/Favorite pokémons/i);

    expect(favPokemonsTitle).toBeInTheDocument();
    expect(pokeDiv).toHaveLength(FAVORITE_NUMBER);
  });

  test('Verifica se existe texto de not found caso não exista favoritos', () => {
    RenderWithRouter(<FavoritePokemons />);
    const noFavoritesText = screen.getByText(/No favorite pokemon found/i);
    const favPokemonsTitle = screen.getByText(/Favorite pokémons/i);

    expect(noFavoritesText).toBeInTheDocument();
    expect(favPokemonsTitle).toBeInTheDocument();
  });
});
