import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Teste o componente FavoritePokemons', () => {
  test('Se é exibido No favorite pokemon found, se  não tiver pokémons favoritos', () => {
    render(<FavoritePokemons />);
    const favPoke = screen.getByText(/No favorite pokemon found/);
    expect(favPoke).toBeInTheDocument();
  });

  test('Se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favPokeCard = screen.getAllByText(/Average weight/);
    expect(favPokeCard.length).not.toBe(0);
  });
});
