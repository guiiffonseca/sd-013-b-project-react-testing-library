import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testa o componente Favorite Pokemons', () => {
  test('teste se a mensagem "No favorite pokemon found" é exibida na tela', () => {
    render(<FavoritePokemons />);

    const favoritePokemon = screen.getByText('No favorite pokemon found');
    expect(favoritePokemon).toBeInTheDocument();
  });

  // test('teste se é exibido todos os cards de pokemons favoritados', () => {
  //   render(<FavoritePokemons />);
  // });
});
