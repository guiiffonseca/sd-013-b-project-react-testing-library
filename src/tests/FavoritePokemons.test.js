import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const testDescription = 'The message "No favorite pokemon found" '
+ 'is displayed if there is no favorite pokemon';

describe('FavoritePokemons.js tests', () => {
  test(testDescription, () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavPokemon = screen.getByText('No favorite pokemon found');

    expect(noFavPokemon).toBeInTheDocument();
  });

  test('All favorite pokemons cards are displayed', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(moreDetailsLink);

    const favoriteCheckbox = screen.getByRole('checkbox');

    userEvent.click(favoriteCheckbox);

    const favoritePokemonsLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(favoritePokemonsLink);

    const pokemonCard = screen.getByTestId('pokemon-name');

    expect(pokemonCard).toBeInTheDocument();
  });
});
