import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('FavoritePokemons.js', () => {
  test(`testa se é exibido na tela a msn "No favorite pokemon found"
    quando não há pokemon favorito`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const textNotFavorit = screen.getByText('No favorite pokemon found');
    expect(textNotFavorit).toBeInTheDocument();
  });

  test('testa se é exibido todos os cards de "pokémons favoritados"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/78');

    const cardsFavorit = screen.getByRole('img', {
      name: 'Rapidash sprite',
    });
    expect(cardsFavorit).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png');
  });
});
