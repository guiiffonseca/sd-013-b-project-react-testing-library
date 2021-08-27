import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../routes/router';

import Pokemon from '../components/Pokemon';
import Pokedex from '../components/Pokedex';

// Lembrar de mockar o Pokemon

test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
  const { history } = renderWithRouter(<Pokemon
    pokemon={pokemon}
    isFavorite={isPokemonFavoriteById[pokemon.id]}
  />);
  const { pokemon } = this.props;
  expect(pokemon).toBeInTheDocument();
});