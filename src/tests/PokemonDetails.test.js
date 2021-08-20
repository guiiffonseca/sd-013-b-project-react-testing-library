import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing PokemonDetails.js component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('if it contains a text <name> Details', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const { name } = pokemons[0];
    const title = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(`${name} Details`);
  });

  test('Should not be a navigation link to the selected Pokémon details.', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();
  });

  test('If it contains a heading h2 with the text Summary', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const summary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();
  });

  test('If there is a section on the page with maps', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { name, foundAt } = pokemons[0];

    const mapLocation = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(mapLocation).toBeInTheDocument();
    expect(mapLocation).toHaveTextContent(`Game Locations of ${name}`);

    const maps = screen.getAllByAltText(`${name} location`);

    foundAt.forEach(({ map, location }, index) => {
      const locationText = screen.getByText(location);
      expect(locationText).toBeInTheDocument();
      expect(maps[index]).toHaveAttribute('src', map);
    });
  });

  test('If the user can bookmark a pokemon', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { name } = pokemons[0];

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const favorite = screen.getByAltText(`${name} is marked as favorite`);
    expect(favorite).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(favorite).not.toBeInTheDocument();
  });
});
