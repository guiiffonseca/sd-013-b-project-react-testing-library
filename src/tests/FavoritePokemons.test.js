import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Tests of component <FavoritePokemons />', () => {
  test('Verify if show in screen message "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const messageNoFavorite = screen.getByText('No favorite pokemon found');
    expect(messageNoFavorite).toBeInTheDocument();
  });
  test('Verify if add pokemons favorites show in screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');
    const checkBox = screen.getByRole('checkbox');
    userEvent.click(checkBox);

    const linkFavorites = screen.getByRole('link', {
      name: /Favorite/i,
    });
    userEvent.click(linkFavorites);

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
