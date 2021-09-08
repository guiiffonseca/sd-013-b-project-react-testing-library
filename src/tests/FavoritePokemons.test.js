import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import { renderWithRouter } from '../components/utils/renderWithRouter';

describe('testes do componente FavoritePokemons', () => {
  test('testa se aparece a mensagem "No favorite pokemon found"', () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    history.push('/favorites');
    const favoritePokemons = screen.getByText(/no favorite pokemon found/i);
    expect(favoritePokemons).toBeInTheDocument();
  });
  test('testa se renderiza os pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const favoritePokemonsLink = screen.getByRole('link', {
      name: /favorite Pokémon/i,
    });
    userEvent.click(favoritePokemonsLink);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
