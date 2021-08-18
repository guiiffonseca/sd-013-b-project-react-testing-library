import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste do componente FavoritePokemons', () => {
  it('Verifica a mensagem "No favorite pokemon found" caso não tenha favoritos', () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    history.push('/favorites');

    const noFavoriteText = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteText).toBeInTheDocument();
  });

  it('Verifica se é exibido o pokémon favoritado', () => {
    renderWithRouter(<App />);

    const textMoreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(textMoreDetails);

    const inputFavorite = screen.getByRole('checkbox');
    expect(inputFavorite).toBeInTheDocument();
    userEvent.click(inputFavorite);

    const linkFavorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(linkFavorite);

    const namePokemon = screen.getByText(/Pikachu/i);
    expect(namePokemon).toBeInTheDocument();
  });
});
