import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import pokemons from '../data';

describe('Pokedex.js tests', () => {
  test('If header has "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const header = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(header).toBeInTheDocument();
  });
  test('If click in "Próximo pokémon" show next pokémon in the list', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    for (let index = 1; index < pokemons.length; index += 1) {
      userEvent.click(nextButton);
      expect(screen.getByText(pokemons[index].name)).toBeInTheDocument();
    }
    userEvent.click(nextButton);
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });
  test('If show only one pokemon', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });
  test('There are filter buttons in the Pokedex', () => {
    renderWithRouter(<App />);
    const TYPE_LENGTH = 7;
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    expect(typeButtons.length).toBe(TYPE_LENGTH);
    expect(allButton).toBeEnabled();
    const dragonButton = screen.getByRole('button', { name: 'Dragon' });
    userEvent.click(dragonButton);
    const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemonButton).toBeDisabled();
    userEvent.click(allButton);
    expect(nextPokemonButton).toBeEnabled();
  });
});
