import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';

import Pokedex from '../components/Pokedex';

import pokemons from '../data';

describe(('Pokedex.js tests'), () => {
  const pokemonTypeTestId = 'pokemon-type-button';
  const pokemonNameTestId = 'pokemon-name';
  const nextPokemonTestId = 'next-pokemon';

  test('Testa se a página contém um Header h2', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true } }
      />,
    );

    const pokedexPageText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexPageText).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[0], pokemons[1]] }
        isPokemonFavoriteById={ { 25: true, 4: true } }
      />,
    );

    const nextPokemon = screen.getByTestId(nextPokemonTestId);
    expect(nextPokemon.textContent).toBe('Próximo pokémon');

    fireEvent.click(nextPokemon);

    const charmander = screen.getByText('Charmander');

    expect(charmander).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [pokemons[0], pokemons[1]] }
        isPokemonFavoriteById={ { 25: true, 4: true } }
      />,
    );

    const ONE_POKEMON = 1;
    const pokemon = screen.getAllByTestId(nextPokemonTestId);

    expect(pokemon.length).toBe(ONE_POKEMON);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true, 4: true, 10: true } }
      />,
    );

    const FILTER_COUNT = 7;
    const filterButtons = screen.getAllByTestId(pokemonTypeTestId);

    expect(filterButtons.length).toBe(FILTER_COUNT);
  });

  test('Testa se a Pokédex filtra somente o tipo selecionado', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true, 4: true, 10: true } }
      />,
    );

    const filterButtons = screen.getAllByTestId(pokemonTypeTestId);
    const fireTypeButton = filterButtons[1];

    expect(fireTypeButton.textContent).toBe('Fire');

    const nextPokemon = screen.getByTestId(nextPokemonTestId);

    fireEvent.click(fireTypeButton);

    const pokemonName = screen.getByTestId(pokemonNameTestId);

    expect(pokemonName.textContent).toBe('Charmander');

    fireEvent.click(nextPokemon);

    expect(pokemonName.textContent).toBe('Rapidash');

    fireEvent.click(nextPokemon);

    expect(pokemonName.textContent).toBe('Charmander');
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true, 4: true, 10: true } }
      />,
    );

    const filterButtons = screen.getAllByTestId(pokemonTypeTestId);
    const fireTypeButton = filterButtons[1];
    const resetFilter = screen.getByText('All');

    const nextPokemon = screen.getByTestId(nextPokemonTestId);

    fireEvent.click(fireTypeButton);

    const pokemonName = screen.getByTestId(pokemonNameTestId);

    expect(pokemonName.textContent).toBe('Charmander');

    fireEvent.click(resetFilter);

    expect(pokemonName.textContent).toBe('Pikachu');

    fireEvent.click(nextPokemon);

    expect(pokemonName.textContent).toBe('Charmander');
  });
});
