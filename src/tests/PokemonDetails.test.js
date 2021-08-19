import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRoutes from '../utils/renderWithRoutes';

import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

const testPokemons = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with'
  + ' electricity to make them tender enough to eat.',
}];

const testIsPokemonFavoriteById = {
  25: false,
};

describe('PokemonDetails.js', () => {
  it('should show detailed info of selected pokemon', () => {
    render(
      <PokemonDetails
        match={ { params: { id: '25' } } }
        isPokemonFavoriteById={ testIsPokemonFavoriteById }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ testPokemons }
      />,
    );
    const pokemonDetailsHeading = screen.getByText(`${testPokemons[0].name} Details`);
    const pokemonDetailsLink = screen.queryByText('More details');
    const pokemonDetailsSummaryHeading = screen.getByText('Summary');
    const pokemonDetailsSummaryParagraph = screen.getByText(testPokemons[0].summary);

    expect(pokemonDetailsHeading).toBeInTheDocument();
    expect(pokemonDetailsLink).not.toBeInTheDocument();
    expect(pokemonDetailsSummaryHeading).toBeInTheDocument();
    expect(pokemonDetailsSummaryHeading).toBeInstanceOf(HTMLHeadingElement);
    expect(pokemonDetailsSummaryParagraph).toBeInTheDocument();
    expect(pokemonDetailsSummaryParagraph).toBeInstanceOf(HTMLParagraphElement);
  });

  it('should be able to show the pokemon locations maps', () => {
    render(
      <PokemonDetails
        match={ { params: { id: '25' } } }
        isPokemonFavoriteById={ testIsPokemonFavoriteById }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ testPokemons }
      />,
    );
    const pokemonDetailsLocationsHeading = screen
      .getByText(`Game Locations of ${testPokemons[0].name}`);

    expect(pokemonDetailsLocationsHeading).toBeInTheDocument();
    expect(pokemonDetailsLocationsHeading).toBeInstanceOf(HTMLHeadingElement);

    const { name, foundAt } = testPokemons[0];

    foundAt.forEach(({ location, map }) => {
      const locationName = screen.getByText(location);
      const locationMaps = screen.getAllByAltText(`${name} location`);
      const locationMap = locationMaps.find(({ src }) => src === map);

      expect(locationName).toBeInTheDocument();
      expect(locationMap).toBeInTheDocument();
    });
  });

  it('should be able to favorite a pakemon', () => {
    renderWithRoutes(<App />);
    const pokemonDetailsLink = screen.getByText('More details');
    const isFavorite = !!screen.queryByAltText('is marked as favorite', { exact: false });

    fireEvent.click(pokemonDetailsLink);

    const pokemonFavoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');

    expect(pokemonFavoriteCheckbox).toBeInTheDocument();
    expect(pokemonFavoriteCheckbox).toHaveAttribute('type', 'checkbox');
    expect(pokemonFavoriteCheckbox.checked).toBe(isFavorite);

    fireEvent.click(pokemonFavoriteCheckbox);

    expect(pokemonFavoriteCheckbox.checked).toBe(!isFavorite);

    fireEvent.click(screen.getByText('Home'));

    expect(
      !!screen.queryByAltText('is marked as favorite', { exact: false }),
    ).toBe(!isFavorite);
  });
});
