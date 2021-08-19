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
  

});
