import React from 'react';
import { screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './util/renderWithRouter';
import pokemons from '../data';
import App from '../App';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
// {
//   id: 25,
//   name: 'Pikachu',
//   type: 'Electric',
//   averageWeight: {
//     value: '6.0',
//     measurementUnit: 'kg',
//   },
//   image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
//   moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
//   foundAt: [
//     {
//       location: 'Kanto Viridian Forest',
//       map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
//     },
//     {
//       location: 'Kanto Power Plant',
//       map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
//     },
//   ],
//   summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
// },
describe('Testando o "Pokemon"', () => {
  it('Testando o "Pokemon"', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const nameDetailsPokemon = screen.getByTestId('pokemon-name');
    expect(nameDetailsPokemon).toBeInTheDocument();

    const typeDetailsPokemon = screen.getByTestId('pokemon-type');
    expect(typeDetailsPokemon).toBeInTheDocument();

    const weightDetailsPokemon = screen.getByTestId('pokemon-weight');
    expect(weightDetailsPokemon).toBeInTheDocument();

    expect(weightDetailsPokemon)
      .toHaveTextContent(
        `Average weight: ${pokemons[0].averageWeight.value} ${pokemons[0]
          .averageWeight.measurementUnit}`,
      );

    const imgPokemon = screen.getByAltText('Pikachu sprite');
    expect(imgPokemon.src).toBe(pokemons[0].image);
    expect(imgPokemon.alt).toBe(`${pokemons[0].name} sprite`);
  });
});
