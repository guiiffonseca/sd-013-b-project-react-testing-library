import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import App from '../App';
import pokemons from '../data';

const pokemon = 'pokemon-name';

describe('Requirement 5 - Test the component <Pokedex />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('should the page contains the h2 element with text "Encountered pokémons"', () => {
    const h2Title = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(h2Title).toBeInTheDocument();
  });

  it('should the next pokemon is rendered', () => {
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);

    const currentPokemon = screen.getByTestId(pokemon);
    expect(currentPokemon).toHaveTextContent('Charmander');
  });

  it('should the first pokemon is rendered, when the list ends', () => {
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    const firstPokemon = screen.getByTestId(pokemon);

    pokemons.forEach((poke, index) => {
      if (poke[index] < pokemons.length) userEvent.click(nextButton);
    });
    expect(firstPokemon).toHaveTextContent(pokemons[0].name);
  });

  it('should have the filter buttons', () => {
    const buttons = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

    buttons.forEach((pokemonType, index) => {
      const typeButtons = screen.getAllByTestId('pokemon-type-button');
      expect(typeButtons[index]).toHaveTextContent(pokemonType);
    });
  });

  it('should the pokemons are filtered', () => {
    pokemons.forEach(({ type }) => {
      const filteredButton = screen.getByRole('button', { name: type });
      expect(filteredButton).toBeInTheDocument();

      userEvent.click(filteredButton);

      const filteredPokemon = screen.getByTestId('pokemon-type');
      expect(filteredPokemon).toHaveTextContent(type);
    });
  });

  it('should have a button with text all', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemons.forEach(({ name }) => {
      const pokemonRendered = screen.getByText(name);
      expect(pokemonRendered).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });
});