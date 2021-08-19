import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Test 3 - Testing Favorite Pokemons ', () => {
  it('Test if "No favorite pokemon found" is shown', () => {
    renderWithRouter(<FavoritePokemons />);

    const pokemonNotFound = screen.getByText('No favorite pokemon found');
    expect(pokemonNotFound).toBeInTheDocument();
  });

  it('Test if favorites pokemons are on the screen', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText(/More details/i);
    userEvent.click(moreDetails);

    const favoriteSelect = screen.getByRole('checkbox');
    userEvent.click(favoriteSelect);

    const favoritePokemons = screen.getByText(/Favorite pokémons/i);
    userEvent.click(favoritePokemons);

    const pokemonText = screen.getByText(/Average weight:/i);
    expect(pokemonText).toBeInTheDocument();
  });
});
