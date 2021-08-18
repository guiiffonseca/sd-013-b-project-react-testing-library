import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('not found pokemon', () => {
  renderWithRouter(<FavoritePokemons />);
  const noFavorite = screen.getByText('No favorite pokemon found');
  expect(noFavorite).toBeInTheDocument();
});

test('Pokemon favoritado', () => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', {
    name: /More details/i,
  });
  userEvent.click(moreDetails);

  const checkbox = screen.getByText('Pokémon favoritado?');
  userEvent.click(checkbox);

  const weight = screen.getByTestId('pokemon-weight');
  expect(weight).toBeInTheDocument();
});
