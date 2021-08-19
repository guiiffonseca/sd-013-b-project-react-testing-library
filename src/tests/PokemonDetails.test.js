import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('tests of the PokemonDetails.test.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('if exists a heading h2 with ', () => {
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    const { name } = pokemons[0];
    const pokeHeading = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(pokeHeading).toBeInTheDocument();
  });

  test('if the link to more details doesnt exists', () => {
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();
  });

  test('if the page contains a heading with the text Summary', () => {
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    const summaryHeading = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(summaryHeading).toBeInTheDocument();
  });

  test('if a paragraph with the summary exists', () => {
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    const pokeSummary = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity to make./,
    );
    expect(pokeSummary).toBeInTheDocument();
  });

  test('if exists a heading that contains the text Game Locations of<name>', () => {
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    const { name } = pokemons[0];
    const locationHeading = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(locationHeading).toBeInTheDocument();
  });

  test('if all the locations are shown', () => {
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    const { name, foundAt } = pokemons[0];
    const mapLocations = screen.getAllByAltText(`${name} location`);
    foundAt.forEach(({ map, location }, index) => {
      const locationText = screen.getByText(location);
      expect(locationText).toBeInTheDocument();
      expect(mapLocations[index]).toHaveAttribute('src', map);
    });
  });

  test('if exists a checkbox to favorite pokemon', () => {
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    const checkBox = screen.getByRole('checkbox');
    const favPokemon = screen.getByText('Pokémon favoritado?');
    expect(checkBox).toBeInTheDocument();
    expect(favPokemon).toBeInTheDocument();
  });
});
