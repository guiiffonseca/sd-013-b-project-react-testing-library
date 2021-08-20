import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing Pokedex.js component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('If page contains a heading h2 with the text Encountered pokemons', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });

  test('If the next Pokémon in the list is displayed when the button is clicked.', () => {
    const pikachuCard = screen.getByText(/pikachu/i);
    expect(pikachuCard).toBeInTheDocument();
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);
    const charmanderCard = screen.getByText(/charmander/i);
    expect(charmanderCard).toBeInTheDocument();
  });

  test('If only one Pokemon is shown at a time', () => {
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('If the Pokédex has the filter buttons.', () => {
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(filterButtons.length).toBe(types.length);

    filterButtons.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(types[index]);
    });

    const all = screen.getByRole('button', {
      name: /All/i,
    });
    expect(all).toBeInTheDocument();
  });

  test('If the Pokédex contains a button to reset the filter', () => {
    const buttonAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll).toHaveTextContent('All');
    userEvent.click(buttonAll);
  });
});
