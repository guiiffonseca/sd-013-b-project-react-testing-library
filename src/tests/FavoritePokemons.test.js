import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './utility/renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

test('Verify if a text appears in the page when no pokémons was favorited', () => {
  const { history } = renderWithRouter(<FavoritePokemons />);
  history.push('/favorites');

  const notFavoritesFoundText = screen.getByText(/No favorite pokemon found/i);
  expect(notFavoritesFoundText).toBeInTheDocument();
});

test('Verify if all the favorited pokémons are shown in the page', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');

  const getDetailLink = screen.getByText(/More details/i);
  userEvent.click(getDetailLink);

  const checkboxFavoriteButton = screen.getByRole('checkbox');
  userEvent.click(checkboxFavoriteButton);
  expect(checkboxFavoriteButton).toBeChecked();

  const favoritePokemonLink = screen.getByText(/Favorite Pokémons/i);
  userEvent.click(favoritePokemonLink);

  const pokemonName = screen.getByText(/Pikachu/i);
  expect(pokemonName).toBeInTheDocument();
});
