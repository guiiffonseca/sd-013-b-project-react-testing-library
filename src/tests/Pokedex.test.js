import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Pokedex.js tests', () => {
  test('The page contains a "Encoutered pokémons" header ', () => {
    renderWithRouter(<App />);

    const pokedexHeader = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(pokedexHeader).toBeInTheDocument();
  });

  test('The button "Próximo pokémon" works correctly', () => {
    renderWithRouter(<App />);

    const checkPokemons = (pokemonName) => {
      const nextPokemonButton = screen.getByRole('button', {
        name: 'Próximo pokémon',
      });
      userEvent.click(nextPokemonButton);
      const currentPokemon = screen.getByText(pokemonName);
      expect(currentPokemon).toBeInTheDocument();
    };

    checkPokemons('Charmander');
    checkPokemons('Caterpie');
    checkPokemons('Ekans');
    checkPokemons('Alakazam');
    checkPokemons('Mew');
    checkPokemons('Rapidash');
    checkPokemons('Snorlax');
    checkPokemons('Dragonair');
    checkPokemons('Pikachu');
  });

  test('Only 1 Pokemon is displayed ', () => {
    renderWithRouter(<App />);

    const currentPokemon = screen.getAllByTestId('pokemon-name');
    expect(currentPokemon.length).toBe(1);
  });

  test('There are filter buttons in the Pokedex', () => {
    renderWithRouter(<App />);
    const TYPE_BUTTONS = 7;

    const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
    const allTypesButton = screen.getByRole('button', {
      name: 'All',
    });

    expect(allTypesButton).toBeInTheDocument();
    expect(pokemonTypeButtons.length).toBe(TYPE_BUTTONS);
    expect(allTypesButton).toBeEnabled();

    const electricTypeButton = screen.getByRole('button', {
      name: 'Electric',
    });
    userEvent.click(electricTypeButton);
    const nextPokemonButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonButton).toBeDisabled();

    userEvent.click(allTypesButton);
    expect(nextPokemonButton).toBeEnabled();
  });
});
