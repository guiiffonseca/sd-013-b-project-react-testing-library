import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const pokemon = 'pokemon-name';

describe('tests of Pokedex.test.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', {
      name: /All/,
    });
    fireEvent.click(allButton);
  });

  test('if the heading h2 has the text Encountered pokémons', () => {
    const pokedexHeadingH2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexHeadingH2).toBeInTheDocument();
  });

  test('if the next pokémon button is working correctly', () => {
    const nextPokeButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextPokeButton).toBeInTheDocument();
    fireEvent.click(nextPokeButton);
    const currentPoke = screen.getByTestId(pokemon);
    expect(currentPoke).toHaveTextContent('Charmander');
  });

  test('if the filter buttons exists', () => {
    const filterPokeButton = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
    filterPokeButton.forEach((pokemonType, index) => {
      const typeButtons = screen.getAllByTestId(/pokemon-type-button/);
      expect(typeButtons[index]).toHaveTextContent(pokemonType);
    });
  });

  test('if the component has an all filter button', () => {
    const allButton = screen.getByRole('button', {
      name: /All/,
    });
    expect(allButton).toBeInTheDocument();
  });
});
