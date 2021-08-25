import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('FavoritePokemons.js tests', () => {
  test('If has not favorite pokemon show "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
  test('If has all favorite pokemons cards', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const pokemonCheck = screen.getByRole('checkbox');
    userEvent.click(pokemonCheck);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const card = screen.getByTestId('pokemon-name');
    expect(card).toBeInTheDocument();
  });
});
