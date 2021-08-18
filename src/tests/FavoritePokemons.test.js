import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const testDescription = 'The message "No favorite pokemon found" '
+ 'is displayed if there is no favorite pokemon';

describe('FavoritePokemons.js tests', () => {
  test(testDescription, () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavPokemon = screen.getByText('No favorite pokemon found');

    expect(noFavPokemon).toBeInTheDocument();
  });

  test('Verifica se exibe todos os cards de pokémons favoritos', () => {
    renderWithRouter(<App />);

    const detailsBotton = screen.getByText('More details');
    userEvent.click(detailsBotton);

    const favButton = screen.getByRole('checkbox');
    userEvent.click(favButton);

    const favoritePokemons = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favoritePokemons);

    const pokemonCard = screen.getByTestId('pokemon-name');
    expect(pokemonCard).toBeInTheDocument();
  });
});
