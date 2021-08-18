import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('', () => {
  it('should render all the informations of pokemon on the screen', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });

  it('should have a link for more details of the current pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
    const isFavorite = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(isFavorite);
    const isFavoriteImage = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(isFavoriteImage.src).toBe('http://localhost/star-icon.svg');
    expect(isFavoriteImage.alt).toBe('Pikachu is marked as favorite');
  });
});
