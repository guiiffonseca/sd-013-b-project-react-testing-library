import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('', () => {
  renderWithRouter(<App />);

  const FavoritePokemon = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(FavoritePokemon);

  const pageFavortePokemon = screen.getByText(/No favorite pokemon found/i);
  expect(pageFavortePokemon).toBeInTheDocument();
});

test('', () => {
  const { history } = renderWithRouter(<App />);

  const PokemonDetails = screen.getByRole('link', {
    name: /More details/i,
  });
  expect(PokemonDetails).toBeInTheDocument();
  userEvent.click(PokemonDetails);

  const FavoritarPokemon = screen.getByRole('checkbox');
  expect(FavoritarPokemon).toBeInTheDocument();
  userEvent.click(FavoritarPokemon);

  history.push('/favorites');
  const cardPokemon = screen.getByAltText('Pikachu sprite');
  const FavoriteIconPikachu = screen.getByAltText('Pikachu is marked as favorite');
  expect(cardPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(FavoriteIconPikachu).toHaveAttribute('src', '/star-icon.svg');
});
