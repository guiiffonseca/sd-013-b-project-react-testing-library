import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

test('Exibe na tela No favorite pokemon found, se não houver favoritos', () => {
  renderWithRouter(<FavoritePokemons />);
  const linkElement = screen.getByText('No favorite pokemon found');
  expect(linkElement).toBeInTheDocument();
});

test('Exibe na tela todos os cards de pokémons favoritados', () => {
  const favorites = [pokemons[0], pokemons[1]];
  renderWithRouter(<FavoritePokemons pokemons={ favorites } />);
  const pikachuCard = screen.getByText('Pikachu');
  const charmanderCard = screen.getByText('Charmander');
  expect(pikachuCard).toBeInTheDocument();
  expect(charmanderCard).toBeInTheDocument();
});
