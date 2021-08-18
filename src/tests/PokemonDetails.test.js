import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../components';

describe('testing details', () => {
  const pokemons = [{
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
    summary: 'history of pikachu',
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
    summary: 'history of charmander',
  },

  ];

  const favOBJ = {
    25: false,
    4: true,
  };

  it('sould test the pokemon details', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ favOBJ }
      match={ { params: { id: '25' } } }
    />);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');

    const nameTitle = screen.getByText('Pikachu Details');
    expect(nameTitle).toHaveTextContent('Pikachu');

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    const sumary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(sumary).toBeInTheDocument();
    const summaryText = screen.getByText('history of pikachu');
    expect(summaryText).toBeInTheDocument();
  });

  it('should test the details section area', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ favOBJ }
      match={ { params: { id: '25' } } }
    />);

    const locationTitle = screen.getByText('Game Locations of Pikachu');
    expect(locationTitle).toBeInTheDocument();
    const maps = screen.getAllByAltText('Pikachu location');
    expect(maps.length).toBe(2);
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const favoritado = screen.getByText('Pokémon favoritado?');
    expect(favoritado).toBeInTheDocument();
  });
});
