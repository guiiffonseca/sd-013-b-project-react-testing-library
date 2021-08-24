import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('testando o componente FavoritePokemons', () => {
  test('renderiza o texto No favorite pokemon found, se nao houver favoritos', () => {
    render(
      // renderiza o FavoritePokemosn com o array pokemons vazio
      <MemoryRouter>
        <FavoritePokemons pokemons={ [] } />
      </MemoryRouter>,
    );
    screen.getByText('No favorite pokemon found');
  });
  test('renderizar card favorito', () => {
    render(
      // renderiza o FavoritePokemosn ja na pag /favorites com array pokemons povuado;
      <MemoryRouter>
        <FavoritePokemons pokemons={ pokemons } />
      </MemoryRouter>,
    );
    const namesPokemons = screen.getAllByTestId('pokemon-name');
    expect(namesPokemons.length).toBe(pokemons.length);
  });
});
