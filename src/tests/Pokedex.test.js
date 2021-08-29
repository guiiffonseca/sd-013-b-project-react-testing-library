import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('test component Pokedex', () => {
  test('texto h2 na tela', () => {
    renderWithRouter(<App />);
    const textPokDeq = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(textPokDeq).toBeInTheDocument();
  });
  test('next pokemon', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(nextPokemon);
    const pokemonCorr = screen.getByText(/Charmander/i);
    expect(pokemonCorr).toBeInTheDocument();
  });
  test('mostra apenas um', () => {
    renderWithRouter(<App />);
    const corrPokemon = screen.getAllByText(/more details/i);
    expect(corrPokemon.length).toBe(1);
  });
  test('buttons filter', () => {
    renderWithRouter(<App />);
    const sizeButton = 7;
    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    expect(buttonFilter.length).toBe(sizeButton);
    const buttonPoison = screen.getByRole('button', {
      name: /Poison/i,
    });
    userEvent.click(buttonPoison);
  });
  test('button All', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(buttonAll);
    const pokemonCorr = screen.getByText(/Pikachu/i);
    expect(pokemonCorr).toBeInTheDocument();
  });
});
