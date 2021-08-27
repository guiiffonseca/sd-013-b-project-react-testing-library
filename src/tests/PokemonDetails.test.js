import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../routes/router';
import pokemons from '../data';

import PokemonDetails from '../components/PokemonDetails';
import App from '../App';
import { Pokedex } from '../components';

test('A página contém um heading h2 com o texto "Encountered pokémons".', () => {
  console.log(<Pokedex />);
  const { history } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
  />);
  const rendersTitle = screen.getByRole('heading', {
    name: /encountered pokémons/i,
    level: 2,
  });
  console.log(<Pokedex />);
  expect(rendersTitle).toBeInTheDocument();
});
