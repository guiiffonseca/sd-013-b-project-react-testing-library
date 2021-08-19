import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Favorite Pokemons funciona corretamente', () => {
  it('Exibe `No favorite pokemon found` quando não há pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoritedMessage = screen.getByText('No favorite pokemon found');

    expect(noFavoritedMessage).toBeInTheDocument();
  });

  it('Exibe todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByText('More details');
    const favoritePokemonsLink = screen.getByText('Favorite Pokémons');

    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const favoriteOption = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteOption);

    const isFavoriteImg = screen.getByRole('img', { name: /is marked as favorite/ });
    expect(isFavoriteImg).toBeInTheDocument();

    userEvent.click(favoritePokemonsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByText(/weight/);

    const pokemonInfos = [pokeName, pokeType, pokeWeight];

    pokemonInfos.forEach((info) => expect(info).toBeInTheDocument());
  });
});
