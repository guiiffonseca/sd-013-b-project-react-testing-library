import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRoutes';

import Pokedex from '../components/Pokedex';

const testPokemons = [
  {
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
    summary: 'This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: 'The flame on its tail shows'
    + ' the strength of its life force. If it is weak, the flame also burns weakly.',
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 30',
        map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
      },
      {
        location: 'Johto Route 31',
        map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
      },
      {
        location: 'Ilex Forest',
        map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
      },
      {
        location: 'Johto National Park',
        map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
      },
    ],
    summary: 'For protection, it releases a horrible'
    + ' stench from the antennae on its head to drive away enemies.',
  },
];

const testTypes = ['Electric', 'Fire', 'Bug'];

const testPokemonIsFavoriteById = {
  25: false,
  4: false,
  10: false,
};

const PokemonTestId = 'pokemon-name';

function passThroughtAllPokemon(nextPokemonButton) {
  testPokemons.forEach(({ name }) => {
    const pokemonName = screen.getByTestId(PokemonTestId);

    expect(pokemonName).toHaveTextContent(name);

    fireEvent.click(nextPokemonButton);
  });
}

describe('Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ testPokemons }
        isPokemonFavoriteById={ testPokemonIsFavoriteById }
      />,
    );
  });

  it('should have heading \'Encountered pokémons\'', () => {
    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  it('should show only 1 pokemon at a time', () => {
    const allPokemon = screen.getAllByTestId(PokemonTestId);

    expect(allPokemon).toHaveLength(1);
  });

  it('should show next pokemon when \'Próximo pokémon\' button is pressed', () => {
    const nextPokemonButton = screen.getByTestId('next-pokemon');

    expect(nextPokemonButton).toBeInTheDocument();
    expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');

    passThroughtAllPokemon(nextPokemonButton);

    const pokemonName = screen.getByTestId(PokemonTestId);

    expect(pokemonName).toHaveTextContent(testPokemons[0].name);
  });

  it('should show filter buttons', () => {
    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    testTypes.forEach((type) => {
      const filteredByTypeButtons = filterButtons
        .filter(({ innerHTML }) => innerHTML === type);

      expect(filteredByTypeButtons).toHaveLength(1);

      fireEvent.click(filteredByTypeButtons[0]);

      const pokemontByType = screen.getByTestId('pokemon-type');

      expect(pokemontByType).toHaveTextContent(type);
    });

    const filterAllButton = screen.getByText('All');

    expect(filterAllButton).toBeInTheDocument();
  });

  it('should have a button to reset filters', () => {
    const filterAllButton = screen.getByText('All');
    const nextPokemonButton = screen.getByTestId('next-pokemon');

    fireEvent.click(filterAllButton);

    passThroughtAllPokemon(nextPokemonButton);
  });
});
