import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './utils/renderWithRouter';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
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
  },
];

describe('FavoritePokemons.js tests', () => {
  it('should show message "No favorite pokemon found", if you dont have pokemon favoriot',
    () => {
      render(<FavoritePokemons />);
      expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
    });

  it('should show all favorite pokemons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(2);
  });
});
