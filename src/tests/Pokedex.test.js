import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const nextButton = 'Próximo pokémon';

  const filters = [
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];

  const pokemonName = 'pokemon-name';

  it('should have a h2 element with Encountered pokémons content', () => {
    expect(screen.getByRole('heading', { level: 2 }))
      .toHaveTextContent('Encountered pokémons');
  });

  it('should contain the text "Próximo pokémon" inside button', () => {
    expect(screen.getByTestId('next-pokemon')).toHaveTextContent(nextButton);
  });

  it('should show the next pokemon when click in "Próximo pokémon"', () => {
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: nextButton }));
    expect(screen.getByText(pokemons[1].name)).toBeInTheDocument();
  });

  it('Should show the first one when press "Próximo pokémon" on the last one', () => {
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
    for (let c = 0; c < pokemons.length; c += 1) {
      userEvent.click(screen.getByRole('button', { name: nextButton }));
    }
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('Should show just one pokémon per time in pokedex', () => {
    for (let c = 0; c < pokemons.length; c += 1) {
      expect(screen.getAllByTestId(pokemonName).length).toBe(1);
      userEvent.click(screen.getByRole('button', { name: nextButton }));
      expect(screen.getAllByTestId(pokemonName).length).toBe(1);
    }
  });

  it('should contains all the filter buttons requested', () => {
    filters.forEach((filter) => {
      expect(screen.getByRole('button', { name: filter })).toBeInTheDocument();
    });
  });

  it('Should show just filtered pokémons and always show all option', () => {
    filters.forEach((filter, index) => {
      userEvent.click(screen.getAllByTestId('pokemon-type-button')[index]);
      const filteredPokemons = pokemons.filter(({ type }) => type === filter);
      filteredPokemons.forEach(({ type }) => {
        expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
        expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
        userEvent.click(screen.getByRole('button', { name: nextButton }));
      });
    });
  });

  it('Should show all pokemons when option "All" is pressed.', () => {
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    pokemons.forEach((pokemon) => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemon.name);
      userEvent.click(screen.getByRole('button', { name: nextButton }));
    });
  });

  it('should start with All selected', () => {
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    pokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: 'Próximo pokémon' }));
    });
  });
});
