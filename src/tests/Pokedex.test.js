import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';

describe('test notFound', () => {
  const favOBJ = {
    25: true,
    4: true,
  };
  const pokemonsMock = [
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
    },
  ];

  it('should see buttons rendered', async () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemonsMock }
      isPokemonFavoriteById={ favOBJ }
    />);
    const tittle = screen.getByText('Encountered pokémons');
    expect(tittle).toBeInTheDocument();
    const buttonNext = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    const testId = 'pokemon-name';
    expect(buttonNext).toBeInTheDocument();
    let text = screen.getAllByTestId(testId);
    expect(text.length).toEqual(1);
    text = screen.getByTestId(testId);
    expect(text).toHaveTextContent('Pikachu');
    userEvent.click(buttonNext);
    text = screen.getByTestId(testId);
    expect(text).toHaveTextContent('Charmander');
    userEvent.click(buttonNext);
    text = screen.getByTestId(testId);
    expect(text).toHaveTextContent('Pikachu');
  });

  it('should have filters buttons', async () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemonsMock }
      isPokemonFavoriteById={ favOBJ }
    />);
    const testId = 'pokemon-name';
    const totalTypeButtons = 2;
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allButtons.length).toEqual(totalTypeButtons);

    const buttonElectric = screen.getByRole('button', {
      name: 'Electric',
    });
    expect(buttonElectric).toBeInTheDocument();
    userEvent.click(buttonElectric);
    let text = screen.getByTestId(testId);
    expect(text).toHaveTextContent('Pikachu');

    const buttonFire = screen.getByRole('button', {
      name: 'Fire',
    });
    expect(buttonFire).toBeInTheDocument();
    userEvent.click(buttonFire);
    text = screen.getByTestId(testId);
    expect(text).toHaveTextContent('Charmander');

    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    text = screen.getByTestId(testId);
    expect(text).toHaveTextContent('Pikachu');
  });
});
