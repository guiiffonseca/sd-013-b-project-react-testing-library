import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from './utils/renderWithRouter';

import pokemons from '../data';

const isPokemonFavoriteById = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const typeFilter = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('Pokedex.js tests', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
  });

  it('should have a heading h2 with the text "Encountered pokémons"', () => {
    expect(
      screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' }),
    ).toBeInTheDocument();
  });

  it('should show the next pokemon by clicking the "Próximo pokémon" button', () => {
    const pokemonNextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(pokemonNextButton).toBeInTheDocument();
    pokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(pokemonNextButton);
    });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('should show only one pokemon at a time', () => {
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
  });

  it('should show a button for each type of replay pokemon', () => {
    const numberOfTypeButtons = 7;
    expect(screen.getAllByTestId('pokemon-type-button'))
      .toHaveLength(numberOfTypeButtons);
    typeFilter.forEach((type) => {
      const typeButton = screen.getAllByRole('button', { name: type });
      expect(typeButton).toHaveLength(1);
      userEvent.click(typeButton[0]);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    });
  });

  it('should show the all button and reset the type filter', () => {
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Psychic' }));
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
  });
});
