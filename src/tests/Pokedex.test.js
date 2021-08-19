import { screen } from '@testing-library/react';
import React from 'react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';

describe('Testa o Pokedex.js', () => {
  const pokemon = {
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
    summary: 'This intelligent',
  };
  const pokemons = [pokemon];

  const isPokemonFavoriteById = pokemon;

  test('Testa se contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    let msg = screen.getByText(/Encountered pokémons/i);
    expect(msg).toBeInTheDocument();

    msg = screen.getByRole('heading', {
      level: 2,
    });
    expect(msg).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const NextButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(NextButton).toBeInTheDocument();
  });
});
