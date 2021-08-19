import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { Pokedex } from '../components';

const mockPokemons = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: { value: '6.0', measurementUnit: 'kg' },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [{ location: 'Kanto Viridian Forest',
    map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
}];

describe('testing cases of Pokedex component', () => {
  test('has a title of level 2 with the text "Encountered pokémons"', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockPokemons[0] }
      />,
    );
    const pokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexTitle).toBeInTheDocument();
  });

	
});
