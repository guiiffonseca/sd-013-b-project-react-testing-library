import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente FavoritePokemons', () => {
  test('Teste se é exibido No favorite pokemon found caso não tenha favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite/i)).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/more details/i));
    fireEvent.click(screen.getByText(/favoritado/i));
    fireEvent.click(screen.getByText(/favorite/i));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
