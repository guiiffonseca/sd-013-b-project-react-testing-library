import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('PokemonDetails.js tests', () => {
  const goToDetails = () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(moreDetailsLink);
  };

  test('The Pokémon details informations are displayed ', () => {
    goToDetails();

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText(/sprite/i);
    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const summaryText = screen.getByText(/This intelligent Pokémon/i);

    expect(pokemonName).not.toHaveTextContent('');
    expect(pokemonType).not.toHaveTextContent('');
    expect(pokemonWeight).toHaveTextContent(/weight/);
    expect(pokemonWeight).toHaveTextContent(/[0-9]/);
    expect(pokemonWeight).toHaveTextContent(/kg/);
    expect(pokemonImg.src).not.toBe('');
    expect(summary).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
  });

  test('There is a header "(Pokemon Name) + Details"', () => {
    goToDetails();

    const pokemon = 'Pikachu';
    const detailsHeader = screen.getByRole('heading', {
      level: 2,
      name: /details/i,
    });

    expect(detailsHeader).toHaveTextContent(`${pokemon} Details`);
  });

  test('There is a section with maps of pokemon locations ', () => {
    goToDetails();

    const pokemon = 'Pikachu';
    const mapHeader = screen.getByRole('heading', {
      level: 2,
      name: /game locations/i,
    });

    expect(mapHeader).toHaveTextContent(`Game Locations of ${pokemon}`);

    const mapImages = screen.getAllByAltText(`${pokemon} location`);

    mapImages.forEach((map) => {
      expect(map.src).not.toBe('');
      expect(map).toHaveAttribute('alt', `${pokemon} location`);
    });
  });

  test('There is an "Favorite Pokemon?" checkbox', () => {
    goToDetails();

    const favoritePokemonLabel = screen.getByLabelText('Pokémon favoritado?');

    expect(favoritePokemonLabel).toBeInTheDocument();
  });
});
