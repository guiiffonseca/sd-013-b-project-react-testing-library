import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Testes FavoritePokémons', () => {
  test('Verifica se é exibido na tela No favorite pokemon found', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const favoriteText = screen.getByText('No favorite pokemon found');
    expect(favoriteText).toBeInTheDocument();
  });
  test('Verifica se todos os cards de pokémons favoritados são exibidos', () => {
    const pikachuId = 25;
    const charmanderId = 4;
    const caterpieId = 10;
    const ekansId = 23;
    const favoritePokemons = pokemons.filter((pokemon) => pokemon.id === pikachuId
    || pokemon.id === charmanderId
    || pokemon.id === caterpieId
    || pokemon.id === pikachuId
    || pokemon.id === ekansId);
    render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ favoritePokemons } />
      </MemoryRouter>,
    );
    const pikachuTitul = screen.getByText('Pikachu');
    const charmanderTitul = screen.getByText('Charmander');
    const caterpieTitul = screen.getByText('Caterpie');
    const ekansTitul = screen.getByText('Ekans');

    expect(pikachuTitul).toBeInTheDocument();
    expect(charmanderTitul).toBeInTheDocument();
    expect(caterpieTitul).toBeInTheDocument();
    expect(ekansTitul).toBeInTheDocument();
  });
});
