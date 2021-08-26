import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import pokemons from '../data';
// import { Pokedex } from '../components';

describe('Pokedex test', () => {
  test('página possui texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const pokedexText = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(pokedexText).toBeInTheDocument();
  });

  test('página possui botão e mostra o próximo pokémon quando clicado', () => {
    renderWithRouter(<App />);

    const pokedexButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(pokedexButton).toBeInTheDocument();
  });
});
