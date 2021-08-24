import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('About the component FavoritePokemons.js', () => {
  it('verifies if the correct message is displayed if there are no favorites', () => {
    renderWithRouter((<App />));

    const favoritesLink = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritesLink);
    const noFavoriteText = screen.getByText(/No favorite pokemon found/i);

    expect(noFavoriteText).toBeInTheDocument();
  });

  it('verfies if the favorite system works correctly', () => {
    renderWithRouter((<App />));

    const detailsLink = screen.getByText(/More details/i);
    fireEvent.click(detailsLink);
    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteCheckbox);
    const favoritesLink = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritesLink);
    const favoriteVerifier = screen.getByAltText(/is marked as favorite/i);

    expect(favoriteVerifier).toBeInTheDocument();
  });
});
