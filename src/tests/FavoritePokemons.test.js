import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o arquivo FavoritePokemons.js', () => {
  it('Testa a exibição da mensagem "No favorite pokemon found" se não há pokémons fav..',
    () => {
      renderWithRouter(<FavoritePokemons />);
      expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
    });
});
