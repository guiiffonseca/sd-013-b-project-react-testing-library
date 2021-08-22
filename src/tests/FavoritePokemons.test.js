import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';

import { FavoritePokemons } from '../components';
import Pokemons from '../data';

describe('Testando componentes da tela de Favoritos', () => {
  it('testa se na tela aparece a mensagem de "No favorite pokemon found". ', () => {
    renderWithRouter(<FavoritePokemons />);
    const haveText = screen.getByText(/No favorite pokemon found/i);

    expect(haveText).toBeInTheDocument();
  });
  it('testa se é exibido todos os cards de pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ Pokemons } />);

    const cards = screen.getAllByTestId('pokemon-name');
    cards.forEach((poke) => {
      expect(poke).toBeInTheDocument();
    });

    expect(cards).toHaveLength(cards.length);
  });
});
