import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testar FavoritePokemons.js', () => {
  test('exibira No favorite pokemon found, se não houver pokémons favoritos.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const notFavorite = screen.getByText(/no favorite pokemon found/i);
    expect(notFavorite).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const clickFavorito = screen.getByLabelText(/pokémon favoritado/i);
    fireEvent.click(clickFavorito);
    const favoritoPokemon = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    fireEvent.click(favoritoPokemon);
    const nomePokemon = screen.getByText(/pikachu/i);
    expect(nomePokemon).toBeInTheDocument();
  });
});
