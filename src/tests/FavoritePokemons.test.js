import React from 'react';
import { screen, render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('Pokemon test', () => {
  test('Testa se página contém um texto no favorite', () => {
    render(<FavoritePokemons />);
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
});
