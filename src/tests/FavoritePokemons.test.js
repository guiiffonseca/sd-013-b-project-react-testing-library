import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons, PokemonDetails } from '../components';

test('se mostra No favorite pokemon found, quando não tiver pokémon favoritos', () => {
  renderWithRouter(<FavoritePokemons />);
  const textPokemons = screen.getByText('No favorite pokemon found');
  expect(textPokemons).toBeInTheDocument();
});

// test('se é exibido todos os cards de pokémons favoritados', () => {
//   renderWithRouter(<PokemonDetails />);
//   const checkboxFavoritePokemons = screen.getByRole('checkbox', {
//     checked: true,
//   });
// });
