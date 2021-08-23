import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

// describe('Testa o componente FavoritePokemons', () => {
//   test('Teste se é exibido No favorite pokemon found caso não tenha favoritos', () => {
//     renderWithRouter(<FavoritePokemons />);
//     expect(screen.getByText(/No favorite/i)).toBeInTheDocument();
//   });
//   test('Teste se é exibido todos os cards de pokémons favoritados', () => {
//     renderWithRouter(<App />);
//     fireEvent.click(screen.getByText(/more details/i));
//     fireEvent.click(screen.getByText(/favoritado/i));
//     fireEvent.click(screen.getByText(/favorite/i));
//     expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
//   });
// });

describe('Testa o componente FavoritePokemons', () => {
  test('Teste se é exibido No favorite pokemon found caso não tenha favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(screen.getByText(/No favorite/i)).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const PIKACHU_ID = 25;
    const CHARMANDER_ID = 4;
    const filteredPokemons = pokemons
      .filter(({ id }) => id === PIKACHU_ID || id === CHARMANDER_ID);
    renderWithRouter(<FavoritePokemons pokemons={ filteredPokemons } />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });
});
