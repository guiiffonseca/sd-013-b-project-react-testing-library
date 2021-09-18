import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import data from '../data';

const NO_FAVORITE_MSG = /No favorite pokemon found/;

describe('Teste o componente FavoritePokemons.js', () => {
  it('Testa se há msg No "favorite pokemon found".', () => {
    render(<FavoritePokemons pokemons={ [] } />);
    expect(screen.getByText(NO_FAVORITE_MSG)).toBeInTheDocument();
  });
  it('Testa se exibe os pokémons favoritados.', () => {
    const cards = [data[0], data[2]];
    renderWithRouter(<FavoritePokemons pokemons={ cards } />);
    expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
    expect(screen.getByText(/Caterpie/)).toBeInTheDocument();
  });
});
