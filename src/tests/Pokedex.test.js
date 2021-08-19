import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Pokédex tests', () => {
  beforeEach(() => renderWithRouter(<App />));
  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

  test('if it has a title', () => {
    const text = screen.getByRole('heading', { name: /pokémons/i, level: 2 });

    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(/encountered pokémons/i);
  });

  test('If it pass to the next pokémon, after interaction', () => {
    const btn = screen.getByTestId('next-pokemon');
    const pokemonName = screen.getByTestId('pokemon-name');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(/próximo pokémon/i);
    userEvent.click(btn);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(/charmander/i);
  });

  test('if its only showing only one pokémon', () => {
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName).toHaveLength(1);
  });

  test('If the filter buttons its working', () => {
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonType = screen.getByTestId('pokemon-type');
    const btn = screen.getByTestId('next-pokemon');
    const all = screen.getByRole('button', { name: 'All' });

    const BTN_LENGTH = 7;

    expect(filterButtons).toHaveLength(BTN_LENGTH);
    expect(all).toBeInTheDocument();
    filterButtons.forEach((type, index) => {
      expect(type).toBeInTheDocument();
      expect(type).toHaveTextContent(types[index]);
    });

    userEvent.click(filterButtons[1]);
    expect(all).toBeInTheDocument();
    expect(filterButtons[1]).toHaveTextContent('Fire');
    expect(pokemonType).toHaveTextContent('Fire');
    for (let index = 0; index < 2; index += 1) {
      userEvent.click(btn);
      expect(pokemonType).toHaveTextContent('Fire');
    }
    expect(all).toBeInTheDocument();
  });

  test('Button all', () => {
    const all = screen.getByRole('button', { name: 'All' });
    const pokemonType = screen.getByTestId('pokemon-type');
    const btn = screen.getByText(/próximo pokémon/i);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    const LOOP_LIMIT = 5;

    expect(all).toBeInTheDocument();
    expect(all).toHaveTextContent('All');
    for (let index = 0; index < LOOP_LIMIT; index += 1) {
      expect(pokemonType).toHaveTextContent(types[index]);
      userEvent.click(btn);
    }

    userEvent.click(filterButtons[6]);
    expect(pokemonType).toHaveTextContent('Dragon');

    userEvent.click(all);
    for (let index = 0; index < LOOP_LIMIT; index += 1) {
      expect(pokemonType).toHaveTextContent(types[index]);
      userEvent.click(btn);
    }
  });
});
