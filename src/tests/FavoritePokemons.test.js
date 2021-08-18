import React from 'react';
import { screen, render } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('about tests', () => {
  it('should test the favorites compoent without pokemons', () => {
    render(<FavoritePokemons />);
    const h2 = screen.getByText('No favorite pokemon found');
    expect(h2).toBeInTheDocument();
  });

  it('should test the favorites compoent with pokemons', () => {
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
      summary:
       'This intelligent Pokémon .',
    }];
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();
    const image = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
