import React from 'react';
import renderWithRouter from '../tests/utils/renderWithRouter';
import { getByRole, getByTestId, screen } from '@testing-library/react';
import { FavoritePokemons, PokemonDetails } from '../components/';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe(`3. Teste o componente <FavoritePokemons.js />`, () => {
  test(`Teste se é exibido na tela a mensagem 'No favorite pokemon found',
  se a pessoa não tiver Pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);

    const msgFavoritePokemon = screen.getByText('No favorite pokemon found');
    expect(msgFavoritePokemon).toBeInTheDocument();
  });
  
  test(`Teste se é exibido todos os cards de Pokémons favoritados.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    const pokemonTitle = screen.getByRole('heading', {
      level: 2,
      name: /Details/i,
    });
    expect(pokemonTitle).toBeInTheDocument();

    const checkboxFavorite = screen.getByLabelText(/favoritado/i);
    userEvent.click(checkboxFavorite);
    expect(checkboxFavorite.checked).toEqual(true);

    history.push('/favorites');

    const msgIconFavorite = screen.getByAltText(/is marked as favorite/i);
    expect(msgIconFavorite).toBeInTheDocument();
  });
});
