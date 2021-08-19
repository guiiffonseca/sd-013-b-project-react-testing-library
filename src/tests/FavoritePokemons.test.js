import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa página Favorite Pokemons', () => {
  it('deve rederizar mensagem de not found', () => {
    renderWithRouter(<FavoritePokemons />);
    const emptyFavoritePokemons = screen.getByText(/No favorite pokemon found/);

    expect(emptyFavoritePokemons).toBeInTheDocument();
  });
  it('deve rederizar pokemons favoritos', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/details/i);
    fireEvent.click(details);
    const favoriteCheck = screen.getByText(/favoritado/i);
    fireEvent.click(favoriteCheck);
    const favoriteButton = screen.getByText(/favorite/i);
    fireEvent.click(favoriteButton);

    expect(screen.getAllByText(/pikachu/i)[0]).toBeInTheDocument();
  });
});
