import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testa se o component Favorite Pokemons contem informações de Pokemon.', () => {
  it('Se a página contem um Heading h2 com o texto Favorite Pokemons', () => {
    renderWithRouter(<FavoritePokemons />);

    const pNotFound = screen.getByText(/No favorite pokemon found/);
    expect(pNotFound).toBeInTheDocument();
  });

  it('Se a página contem um Heading h2 com o texto Favorite Pokemons', () => {
    const ekans = [pokemons[3]];
    renderWithRouter(<FavoritePokemons pokemons={ ekans } />);

    const pEkans = screen.getByText(/Ekans/);
    expect(pEkans).toBeInTheDocument();

    const Mew = [pokemons[5]];
    renderWithRouter(<FavoritePokemons pokemons={ Mew } />);

    const pMew = screen.getByText(/Mew/);
    expect(pMew).toBeInTheDocument();
  });
});
