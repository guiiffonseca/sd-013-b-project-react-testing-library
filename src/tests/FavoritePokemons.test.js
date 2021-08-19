import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Favorite =Pokemons funciona corretamente', () => {
  it('Exibe `No favorite pokemon found` quando não há pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoritedMessage = screen.getByText('No favorite pokemon found');

    expect(noFavoritedMessage).toBeInTheDocument();
  });

  it('', () => {

  });
});
