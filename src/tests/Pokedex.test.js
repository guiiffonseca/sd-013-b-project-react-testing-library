import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utility/renderWithRouter';
import pokemons from '../data';
import App from '../App';

test('Verify if the page has H2 with "Encountered pokémons" text', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');

  const h2FromThePage = screen.getByText(/Encountered Pokémons/i);
  expect(h2FromThePage).toBeInTheDocument();
});

test('Verify if when next pokémon button is pressed, the next pokémon appears', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');

  expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  const nextPokemonButton = screen.getByText(/Próximo Pokémon/i);
  for (let index = 1; index < pokemons.length; index += 1) {
    userEvent.click(nextPokemonButton);
    expect(screen.getByText(pokemons[index].name)).toBeInTheDocument();
  }
  userEvent.click(nextPokemonButton);
  expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
});

test('Verify if the page has filter buttons', () => {
  renderWithRouter(<App />);

  const pokemonTypes = [
    'All',
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];

  pokemonTypes.forEach((type) => {
    const typeButton = screen.getByRole('button', {
      name: type,
    });
    expect(typeButton).toBeInTheDocument();
  });
});

test('Verify if the correct pokémon appears when button type is clicked', () => {
  renderWithRouter(<App />);
  const typePokeTestButton = 'pokemon-type-button';

  const typeElectric = screen.getAllByTestId(typePokeTestButton)[0];
  userEvent.click(typeElectric);
  const electricPokemonName = screen.getByText(/Pikachu/i);
  expect(electricPokemonName).toBeInTheDocument();

  const typeFire = screen.getAllByTestId(typePokeTestButton)[1];
  userEvent.click(typeFire);
  const firePokemonName = screen.getByText(/Charmander/i);
  expect(firePokemonName).toBeInTheDocument();

  const typeBug = screen.getAllByTestId(typePokeTestButton)[2];
  userEvent.click(typeBug);
  const bugPokemonName = screen.getByText(/Caterpie/i);
  expect(bugPokemonName).toBeInTheDocument();
});

test('Verify if when all button is pressed, the filtered list is reseted', () => {
  renderWithRouter(<App />);

  const allButton = screen.getByRole('button', {
    name: 'All',
  });
  expect(allButton).toBeInTheDocument();
  userEvent.click(allButton);

  pokemons.forEach((pokemon) => {
    const pokemonName = screen.getByText(pokemon.name);
    expect(pokemonName).toBeInTheDocument();
    const nextButton = screen.getByText(/Próximo Pokémon/i);
    userEvent.click(nextButton);
  });
});
