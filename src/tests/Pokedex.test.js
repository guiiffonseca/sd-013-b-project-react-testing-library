import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../routes/router';
import pokemons from '../data';

import Pokedex from '../components/Pokedex';
import App from '../App';

test('A página contém um heading h2 com o texto "Encountered pokémons".', () => {
  const { history } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
  />);
  const rendersTitle = screen.getByRole('heading', {
    name: /encountered pokémons/i,
    level: 2,
  });
  expect(rendersTitle).toBeInTheDocument();
});

test('A página contém um botão para renderizar o próximo pokémon.', () => {
  const { history } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
  />);
  const rendersButton = screen.getByTestId('next-pokemon');
  const renderedButtonText = rendersButton.innerHTML;
  expect(renderedButtonText).toBe('Próximo pokémon');
});