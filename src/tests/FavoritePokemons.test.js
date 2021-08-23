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
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const PIKACHU_ID = 25;
    const CATERPIE_ID = 10;
    const EKANS_ID = 23;
    const filteredPokemons = pokemons
      .filter(({ id }) => id === PIKACHU_ID || id === CATERPIE_ID || EKANS_ID);
    renderWithRouter(<FavoritePokemons pokemons={ filteredPokemons } />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
    expect(screen.getByText('Ekans')).toBeInTheDocument();
  });
});
