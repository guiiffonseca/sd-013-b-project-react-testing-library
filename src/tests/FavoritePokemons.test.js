import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('É exibido na tela a mensagem , se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFoundText = screen.getByText('No favorite pokemon found');
    expect(noFoundText).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const simulatedProps = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https: //cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https: //bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [{ location: 'Kanto Viridian Forest',
        map: 'https: //cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' },
      { location: 'Kanto Power Plant',
        map: 'https: //cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }],
      summary: 'This intelligent Pokémon roasts hard berries '
      + 'with electricity to make them tender enough to eat.',
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
      foundAt: [{ location: 'Johto Route 30',
        map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png' },
      { location: 'Johto Route 31',
        map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png' },
      { location: 'Ilex Forest',
        map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png' },
      { location: 'Johto National Park',
        map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png' }],
      summary: 'For protection, it releases a horrible stench'
    + ' from the antennae on its head to drive away enemies.' },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ simulatedProps } />);
    const pikachuName = screen.getByText('Pikachu');
    const caterpieName = screen.getByText('Caterpie');
    const imagesCounter = screen.getAllByRole('img');
    const imageQuantity = 4;
    expect(pikachuName).toBeInTheDocument();
    expect(caterpieName).toBeInTheDocument();
    expect(imagesCounter.length).toBe(imageQuantity);
  });
});
