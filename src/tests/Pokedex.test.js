import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';
import filterPokemonTypes from './utils/filterPokemonTypes';
import filterPokemonByType from './utils/filterPokemonByType';

describe('Pokedex.js Tests', () => {
  const pokedexData = {
    headingText: 'Encountered pokémons',
    nextButtonText: 'Próximo pokémon',
    types: filterPokemonTypes(),
    pokemonNameTestId: 'pokemon-name',
  };

  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('A página contém um heading h2 com o texto Encountered pokémons.', () => {
    const pokedexHeading = screen.getByRole('heading', { level: 2 });

    expect(pokedexHeading).toBeInTheDocument();
    expect(pokedexHeading.innerHTML).toMatch(pokedexData.headingText);
  });

  test('É exibido o próximo Pokémon da lista quando o botão Próximo é clicado.', () => {
    const nextPKMButton = screen.getByTestId('next-pokemon');

    expect(nextPKMButton).toBeInTheDocument();
    expect(nextPKMButton.innerHTML).toMatch(pokedexData.nextButtonText);

    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId(pokedexData.pokemonNameTestId);

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName.innerHTML).toMatch(pokemon.name);

      userEvent.click(nextPKMButton);
    });

    const fistPokemonName = screen.getByTestId(pokedexData.pokemonNameTestId);
    expect(fistPokemonName.innerHTML).toMatch(pokemons[0].name);
  });

  test('É mostrado apenas um Pokémon por vez.', () => {
    const pokemonName = screen.getAllByTestId(pokedexData.pokemonNameTestId);

    expect(pokemonName.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const nextPKMButton = screen.getByTestId('next-pokemon');
    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    expect(typeButtons.length).toBe(pokedexData.types.length);

    typeButtons.forEach((button) => {
      const buttonText = button.innerHTML;

      expect(pokedexData.types.some((type) => type === buttonText)).toBeTruthy();

      userEvent.click(button);

      const filteredPokemons = filterPokemonByType(button.innerHTML);

      filteredPokemons.forEach((pokemon) => {
        const pokemonName = screen.getByTestId(pokedexData.pokemonNameTestId);
        expect(pokemonName.innerHTML).toMatch(pokemon.name);
        userEvent.click(nextPKMButton);
      });
    });

    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
  });

  test('A Pokédex contém um botão para resetar o filtro', () => {
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();

    expect(() => userEvent.click(allButton)).not.toThrowError();
  });
});
