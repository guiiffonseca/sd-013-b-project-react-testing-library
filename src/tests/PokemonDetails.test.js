import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';

import App from '../App';
import pokemons from '../data';

describe('Test the component <PokemonDetails />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('should page title contains "pokemon name"', () => {
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const { name } = pokemons[0];
    const titlePage = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(titlePage).toBeInTheDocument();
    expect(titlePage).toHaveTextContent(`${name} Details`);
  });

  it('should the more details link doesnt render in the details page', () => {
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    expect(moreDetailsLink).not.toBeInTheDocument();
  });

  it('should page title contains "Summary" and his text', () => {
    const { summary } = pokemons[0];

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const summaryTitle = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });

    const pokemonText = screen.getByText(summary);
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryTitle).toHaveTextContent(/summary/i);
    expect(pokemonText).toBeInTheDocument();
    expect(pokemonText).toHaveTextContent(summary);
  });

  it('should exist section contains the maps about pokemon location', () => {
    const { name, foundAt } = pokemons[0];

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const pokemonLocationTitle = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });

    expect(pokemonLocationTitle).toBeInTheDocument();
    expect(pokemonLocationTitle).toHaveTextContent(`Game Locations of ${name}`);

    const maps = screen.getAllByAltText(`${name} location`);

    foundAt.forEach(({ map, location }, index) => {
      const locationText = screen.getByText(location);
      expect(locationText).toBeInTheDocument();
      expect(maps[index]).toHaveAttribute('src', map);
    });
  });

  it('should contains favorite pokemon checkbox', () => {
    const { name } = pokemons[0];

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /Pokémon favoritado/i,
    });
    expect(favoriteCheckbox).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);

    const isFavorite = screen.getByAltText(`${name} is marked as favorite`);
    expect(isFavorite).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    expect(isFavorite).not.toBeInTheDocument();
  });
});
