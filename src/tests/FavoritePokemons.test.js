import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Component FavoritePokemons tests', () => {
  it('should return not found when has not favorite pokemons', () => {
    render(<FavoritePokemons />);

    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('should ', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const pokemonsFound = screen.getAllByTestId('pokemon-name');
    expect(pokemonsFound).not.toHaveLength(0);
  });
});
