import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('testando o componente FavoritePokemons', () => {
  test('renderiza o texto No favorite pokemon found, se nao houver favoritos', () => {
    render(
      // quando FavoritePokemons renderiza na tela sem nada contem o texto No favorite pokemon found;
      <MemoryRouter>
        <FavoritePokemons pokemons={ [] } />
      </MemoryRouter>,
    );
    screen.getByText('No favorite pokemon found');
  });
  test('renderizar card favorito', () => {
    render(
      // Quando FavoritePokemosn tive com os Pokemons marcados como favoritos;
      <MemoryRouter>
        <FavoritePokemons pokemons={ pokemons } />
      </MemoryRouter>,
    );
    const pokemonsFavorites = screen.getAllByTestId('pokemon-name');
    expect(pokemonsFavorites.length).toBe(pokemons.length);
  });
});
