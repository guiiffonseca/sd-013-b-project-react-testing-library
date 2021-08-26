import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 3 - Tenstando o componente <FavoritePokemons />', () => {
  beforeEach(() => {
    render(<FavoritePokemons />);
  });

  it('Testa quando não há Pokémons favoritados', () => {
    const noFavoritePkm = screen.getByText('No favorite pokemon found');
    expect(noFavoritePkm).toBeDefined();
  });
});
