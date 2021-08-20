import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('PokemonDetails.js tests', () => {
  let moreDetails;
  let history;

  beforeEach(() => {
    history = renderWithRouter(
      <App />,
    ).history;
    moreDetails = screen.getByRole('link', { name: 'More details' });
  });

  it('should show the detailed information on the screen', () => {
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');

    expect(screen.getByRole('heading', { level: 2, name: 'Pikachu Details' }))
      .toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Summary' }))
      .toBeInTheDocument();

    const paragraph = 'This intelligent Pokémon roasts hard berries'
      + ' with electricity to make them tender enough to eat.';
    expect(screen.getByText(paragraph)).toBeInTheDocument();
  });

  it('should have a section with maps containing the locations of the pokemon', () => {
    userEvent.click(moreDetails);

    expect(screen.getByRole('heading', {
      level: 2, name: 'Game Locations of Pikachu',
    })).toBeInTheDocument();

    const images = screen.getAllByAltText('Pikachu location');
    expect(images).toHaveLength(2);
    expect(images[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    expect(screen.getAllByText(/Kanto/)).toHaveLength(2);
  });

  it('should allow the user to bookmark a Pokémon as a favorite', () => {
    userEvent.click(moreDetails);
    const checkboxPokemonFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxPokemonFavorite).toBeInTheDocument();
    userEvent.click(checkboxPokemonFavorite);

    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/star-icon.svg');

    userEvent.click(checkboxPokemonFavorite);
    expect(img).not.toBeInTheDocument();
  });
});
