import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('tests on the FavoritePokemons.test.js', () => {
  test('if the text no favorite pokemon found is in the component', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFav = screen.getByText('No favorite pokemon found');
    expect(noFav).toBeInTheDocument();
  });

  test('if all favorite pokemon are show', () => {
    const simulatedProps = [{
      id: 65,
      name: 'Alakazam',
      type: 'Psychic',
      averageWeight: {
        mesurementUnit: 'kg',
        value: '48.0',
      },
      image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
    }];
    renderWithRouter(<FavoritePokemons pokemons={ simulatedProps } />);
    const favPokemon = screen.getAllByTestId('pokemon-name');
    expect(favPokemon.length).not.toBe(0);
  });
});
