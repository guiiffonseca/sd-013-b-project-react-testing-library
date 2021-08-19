import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/helper';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js', () => {
  test('Se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    history.push('/favorites');
    const noFavPokemonMessege = screen.getByText(/No favorite pokemon found/i);
    expect(noFavPokemonMessege).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetailsLink);

    const favoritePokeButton = screen.getByText(/Pokémon favoritado/i);
    userEvent.click(favoritePokeButton);

    renderWithRouter(<FavoritePokemons />);
    const pokemonId = screen.getByTestId(/pokemon-name/i);
    expect(pokemonId).toBeInTheDocument();
  });
});
