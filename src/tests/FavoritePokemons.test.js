import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente FavoritePokemons.js', () => {
  test('Testa se é exibido na tela a mensagem "No favorite pokemon found" ', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemon = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritePokemon).toBeInTheDocument();
  });
});
