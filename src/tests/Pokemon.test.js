import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('', () => {
  const { history } = renderWithRouter(<App />);
  const MoreDetails = screen.getByText('More details');
  expect(MoreDetails).toHaveAttribute('href', '/pokemons/25');

  history.push('/pokemons/25');

  const PokemonName = screen.getByTestId('pokemon-name');
  const PokemonType = screen.getByTestId('pokemon-type');
  const PokemonWeight = screen.getByTestId('pokemon-weight');
  expect(PokemonName).toHaveTextContent('Pikachu');
  expect(PokemonType).toHaveTextContent('Electric');
  expect(PokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

  const PikachuImg = screen.getByAltText('Pikachu sprite');
  expect(PikachuImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

  const FavoritarPokemon = screen.getByRole('checkbox');
  userEvent.click(FavoritarPokemon);
  expect(FavoritarPokemon.checked).toBe(true);

  const FavoriteIconPikachu = screen.getByAltText('Pikachu is marked as favorite');
  expect(FavoriteIconPikachu).toHaveAttribute('src', '/star-icon.svg');
});
