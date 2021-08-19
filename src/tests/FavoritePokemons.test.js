import React from 'react';
import { fireEvent, screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testar FavoritePokemons.js', () => {
  test('exibido na tela a mensagem No favorite pokemon found, se não pokémons favoritos.', () => {
    const { history, getByText } = renderWithRouter(<App />)
    history.push('/favorites')
    const notFavorite = getByText(/no favorite pokemon found/i)
    expect(notFavorite).toBeInTheDocument()
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history, getByLabelText, getByText } = renderWithRouter(<App />)
    history.push('/pokemons/25')
    const clickFavorito = getByLabelText(/pokémon favoritado/i)
    fireEvent.click(clickFavorito)
    const favoritoPokemon = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    fireEvent.click(favoritoPokemon)
    const nomePokemon = getByText(/pikachu/i);
    expect(nomePokemon).toBeInTheDocument()
  });
});