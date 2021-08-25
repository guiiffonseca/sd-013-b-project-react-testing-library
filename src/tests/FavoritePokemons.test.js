import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../utils/renderWithRouter';
import pokemons from '../data';

// Codigo refeito depois de fazer um CR no projeto do Lucas Caribé
describe('Testando FavoritePokemons.js', () => {
  test('a página deve exibir uma mensagem caso não haja pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const noFavorites = screen.getByText('No favorite pokemon found');

    expect(noFavorites).toBeInTheDocument();
  });

  test('se são exibidos todos os cards de pokémon favoritados', () => {
    const CHARMANDER_ID = 4;
    const SNORLAX_ID = 143;
    const DRAGONAIR_ID = 148;

    const favoritePokemon = pokemons.filter(
      ({ id }) => id === CHARMANDER_ID || id === DRAGONAIR_ID || id === SNORLAX_ID,
    );

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);

    const charmander = screen.getByText(/charmander/i);
    const snorlax = screen.getByText(/snorlax/i);
    const dragonair = screen.getByText(/dragonair/i);

    expect(charmander).toBeInTheDocument();
    expect(snorlax).toBeInTheDocument();
    expect(dragonair).toBeInTheDocument();
  });
});
