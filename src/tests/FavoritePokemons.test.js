import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('tests about FavoritePokemons component', () => {
  test('show the text "no favorite pokemon found" if has no favorite pokemon selected',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const noFavoriteText = screen.getByText(/no favorite pokemon found/i);
      expect(noFavoriteText).toBeInTheDocument();
    });
  test(
    'select a pokemon as favorite makes her shows on favorite pokémons screen',
    () => {
      const { history } = renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(moreDetailsLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/25');
      const favoriteInput = screen.getByRole('checkbox');
      expect(favoriteInput).toBeInTheDocument();
      userEvent.click(favoriteInput);
      const favoritePokemonsLink = screen.getByRole('link', {
        name: /favorite pokémons/i,
      });
      expect(favoritePokemonsLink).toBeInTheDocument();
      userEvent.click(favoritePokemonsLink);
      const favoritePath = history.location.pathname;
      expect(favoritePath).toBe('/favorites');
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toBeInTheDocument();
    },
  );
});
