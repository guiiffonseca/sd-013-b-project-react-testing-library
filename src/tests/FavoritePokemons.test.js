import React from 'react';
import { screen, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router';
import FavoritePokemons from '../components/FavoritePokemons';

const noPokemonMock = [];
const pokemonMock = [{
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
  summary: '',
},
];

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('mensagem No favorite pokemon found, se não tiver pokémons favoritos.', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ noPokemonMock } />
      </MemoryRouter>,
    );

    const favoritePage = screen.getByText('No favorite pokemon found');
    expect(favoritePage).toBeInTheDocument();
  });

  test('é exibido todos os cards de pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ pokemonMock } />
      </MemoryRouter>,
    );

    const favoritePage = screen.getByTestId('pokemon-name');
    expect(favoritePage).toBeInTheDocument();
  });
});
