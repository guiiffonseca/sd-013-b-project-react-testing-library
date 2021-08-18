import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './util/renderWithRouter';

describe('testando "Favorite Pokemons"', () => {
  it('testar montagem do componente "FavoritePokemons"', () => {
    renderWithRouter(<FavoritePokemons />);
    const msgFavoriteNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(msgFavoriteNotFound).toBeInTheDocument();
  });
});
