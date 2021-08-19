import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  test(`Teste se é exibido na tela a mensagem 'No favorite pokemon found',
  se a pessoa não tiver Pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);

    const msgFavoritePokemon = screen.getByText('No favorite pokemon found');
    expect(msgFavoritePokemon).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const checkboxFavorite25 = screen.getByLabelText(/favoritado/i);
    userEvent.click(checkboxFavorite25);
    // source: https://stackoverflow.com/a/55178588
    expect(checkboxFavorite25.checked).toEqual(true);

    history.push('/pokemons/78');
    const checkboxFavorite78 = screen.getByLabelText(/favoritado/i);
    userEvent.click(checkboxFavorite78);
    expect(checkboxFavorite78.checked).toEqual(true);

    history.push('/favorites');
    const msgIconFavorite = screen.getAllByAltText(/is marked as favorite/i);
    expect(msgIconFavorite.length).toBe(2);
  });
});
