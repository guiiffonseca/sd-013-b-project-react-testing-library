import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

describe('FavoritePokemons.js Tests', () => {
  let history;
  const favPokemonsData = {
    noFavMessage: 'No favorite pokemon found',
  };

  beforeEach(() => {
    history = renderWithRouter(<App />).history;
    history.push('/favorites');
  });

  test('Exibe na tela a mensagem No favorite pokemon found, caso sem favoritos.', () => {
    const noFavMessage = screen.getByText(favPokemonsData.noFavMessage);

    expect(noFavMessage).toBeInTheDocument();
  });

  test('Exibe todos os cards de pokémons favoritados.', async () => {
    pokemons.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.id}`);

      const favoriteCheck = screen.getByRole('checkbox');
      userEvent.click(favoriteCheck);
    });

    await history.push('/favorites');

    const pokemonNames = screen.getAllByTestId('pokemon-name');

    pokemons.forEach((pokemon, index) => {
      expect(pokemonNames[index]).toBeInTheDocument();
      expect(pokemonNames[index].innerHTML).toBe(pokemon.name);
    });
  });
});
