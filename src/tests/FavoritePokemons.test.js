import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/renderWithRouter';
import data from '../data';

describe('Testa o componente FavoritePokemon', () => {
  it('Testa se exibe "No favorite pokemon found" caso necessário', () => {
    const favPokemons = [];
    renderWithRouter(<FavoritePokemons pokemons={ favPokemons } />);
    const noFavoriteFound = screen.getByText('No favorite pokemon found');

    expect(noFavoriteFound).toBeInTheDocument();
  });

  it('Testa se são exibinidos todos os cards de pokemons favoritados', () => {
    const favPokemons = data.filter((x) => x.name === 'Mew' || x.name === 'Rapidash');
    renderWithRouter(<FavoritePokemons pokemons={ favPokemons } />);
    const fav1 = screen.getByText('Mew');
    const fav2 = screen.getByText('Rapidash');

    expect(fav1).toBeInTheDocument();
    expect(fav2).toBeInTheDocument();
  });
});
