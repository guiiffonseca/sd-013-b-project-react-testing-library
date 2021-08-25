import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokedex test', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const pokeName = 'pokemon-name';

  test('A página deve conter o texto "Encountered pokémons"', () => {
    const EncounteredText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(EncounteredText).toBeInTheDocument();
  });

  test('Deve ser exibido o pŕoximo Pokemón quando o botão for clicado', () => {
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();

    const pokemonName = screen.getByTestId(pokeName);
    expect(pokemonName).toBeInTheDocument();

    pokemons.map((pokemon, index) => {
      expect(pokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(nextButton);

      return expect(pokemonName).not.toHaveTextContent(pokemons[index].name);
    });

    pokemons.forEach((pokemon, index) => {
      if (index < pokemons.length - 1) {
        userEvent.click(nextButton);
      }
    });

    const lastPokemon = pokemons[pokemons.length - 1].name;
    expect(pokemonName).toHaveTextContent(lastPokemon);
    userEvent.click(nextButton);

    const firstPokemon = pokemons[0].name;
    expect(pokemonName).toHaveTextContent(firstPokemon);
  });

  test('Verifique o botão de filtro da Pokédex', () => {
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(types.length);

    buttons.map((button, index) => {
      expect(button).toBeInTheDocument();
      return expect(buttons[index]).toHaveTextContent(types[index]);
    });
  });

  test('Verifique se ao filtrar são exibido por tipo', () => {
    const pokemonName = screen.getByTestId(pokeName);

    const bugButton = screen.getByRole('button', {
      name: /bug/i,
    });
    expect(bugButton).toBeInTheDocument();
    userEvent.click(bugButton);
    expect(pokemonName).toHaveTextContent('Caterpie');
  });

  test('Verificar se os filtros são resetados', () => {
    const allButton = screen.getByRole('button', { name: /All/i });
    const pokemonName = screen.getByTestId(pokeName);
    const nextButton = screen.getByTestId('next-pokemon');
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);
    pokemons.forEach((pokemon, i) => {
      expect(pokemonName).toHaveTextContent(pokemons[i].name);
      userEvent.click(nextButton);
      expect(allButton).toBeInTheDocument();
    });
  });
});
