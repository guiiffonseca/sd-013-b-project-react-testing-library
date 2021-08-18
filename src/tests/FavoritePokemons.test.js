import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('mensagem No favorite pokemon found, se pessoa não ter pokémons favoritos', () => {
    // renderiza:
    renderWithRouter(<FavoritePokemons />);
    // testa:
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

//   test('Teste se é exibido todos os cards de pokémons favoritados', () => {
//     // Renderiza :
//     renderWithRouter(<FavoritePokemons />);
//     // acessa:
//     const pokemonName = screen.getByTestId('pokemon-name');
//     // testes :
//     expect(pokemonName).toBeInTheDocument();
//   });
});
