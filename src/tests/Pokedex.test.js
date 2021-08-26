import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const pokemonName = 'pokemon-name';
const nextPokemon = 'next-pokemon';

const getPokemonsOfType = (type) => pokemons.filter((pokemon) => pokemon.type === type);

test('Contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { } } />);
  const H2Element = screen.getByRole('heading', { level: 2 });
  expect(H2Element).toBeInTheDocument();
  expect(H2Element.innerHTML).toBe('Encountered pokémons');
});

test('Próximo pokémon é exibido quando o botão Próximo pokémon é clicado', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { } } />);
  const nextPokemonButton = screen.getByTestId(nextPokemon);
  expect(nextPokemonButton.innerHTML).toBe('Próximo pokémon');
  for (let i = 0; i < pokemons.length; i += 1) {
    const currentPokemon = screen.getByTestId(pokemonName);
    expect(currentPokemon).toBeInTheDocument();
    expect(currentPokemon.innerHTML).toBe(pokemons[i].name);
    fireEvent.click(nextPokemonButton);
    expect(currentPokemon.innerHTML).not.toBe(pokemons[i].name);
  }
  const currentPokemon = screen.getByTestId(pokemonName);
  expect(currentPokemon).toBeInTheDocument();
  expect(currentPokemon.innerHTML).toBe(pokemons[0].name);
});

test('Mostra apenas 1 pokémon por vez', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { } } />);
  const currentPokemon = screen.getAllByTestId(pokemonName);
  expect(currentPokemon).toHaveLength(1);
  fireEvent.click(screen.getByTestId(nextPokemon));
  expect(currentPokemon).toHaveLength(1);
});

test('Pokédex tem botões de filtro', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { } } />);
  const filterButtons = screen.getAllByTestId('pokemon-type-button');
  const filterButtonNames = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal',
    'Dragon'];
  for (let i = 0; i < filterButtons.length; i += 1) {
    expect(filterButtons[i]).toBeInTheDocument();
    expect(filterButtons[i].innerHTML).toBe(filterButtonNames[i]);
    const allPokemonsOfType = getPokemonsOfType(filterButtonNames[i]);
    fireEvent.click(filterButtons[i]);
    for (let j = 0; j < allPokemonsOfType.length; j += 1) {
      const currentPokemonOfType = screen.getByTestId('pokemon-type');
      expect(currentPokemonOfType).toBeInTheDocument();
      expect(currentPokemonOfType.innerHTML).toBe(filterButtonNames[i]);
    }
  }
});

test('Pokédex tem um botão para resetar o filtro', () => {
  // All pokemons > filtered pokemons
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { } } />);
  const filterButton = screen.getAllByTestId('pokemon-type-button')[1];
  const allButton = screen.getByText('All');
  let currentPokemon = screen.getByTestId(pokemonName);
  const currentTypePokemons = [];
  const allTypePokemons = [];
  expect(allButton).toBeInTheDocument();
  fireEvent.click(filterButton);
  while (!(currentTypePokemons.includes(currentPokemon.innerHTML))) {
    currentTypePokemons.push(currentPokemon.innerHTML);
    fireEvent.click(screen.getByTestId(nextPokemon));
    currentPokemon = screen.getByTestId(pokemonName);
  }
  fireEvent.click(allButton);
  currentPokemon = screen.getByTestId(pokemonName);
  while (!(allTypePokemons.includes(currentPokemon.innerHTML))) {
    allTypePokemons.push(currentPokemon.innerHTML);
    fireEvent.click(screen.getByTestId(nextPokemon));
    currentPokemon = screen.getByTestId(pokemonName);
  }
  expect(allTypePokemons.length).toBeGreaterThan(currentTypePokemons.length);
});
