import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonName = 'pokemon-name';
const seven = 7;
const typesArr = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

test('if it renders the title', () => {
  renderWithRouter(<App />);

  const title = screen.getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(title).toBeInTheDocument();
});

test('if there is a \'Next Pokemon\' button', () => {
  renderWithRouter(<App />);

  const nextPokemonButton = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });

  expect(nextPokemonButton).toBeInTheDocument();
});

test('if the \'Next Pokemon\' button works', () => {
  renderWithRouter(<App />);

  const allPokemons = screen.getByText(/All/);
  userEvent.click(allPokemons);
  const nextPokemonButton = screen.getByTestId('next-pokemon');
  const actualPokemonName = screen.getByTestId(pokemonName);
  userEvent.click(nextPokemonButton);
  const nextPokemonName = screen.getByTestId(pokemonName);
  expect(actualPokemonName).not.toHaveTextContent(nextPokemonName);
});

test('if ir renders only one pokemon at a time', () => {
  renderWithRouter(<App />);

  const name = screen.getAllByTestId(pokemonName);
  expect(name.length).toBe(1);
});

test('if there are 7 type buttons', () => {
  renderWithRouter(<App />);

  const typeButtons = screen.getAllByTestId('pokemon-type-button');
  expect(typeButtons.length).toBe(seven);
});

test('if there is only one type button for each pokemon', () => {
  renderWithRouter(<App />);

  typesArr.forEach((type) => {
    const specificButton = screen.getAllByRole('button', { name: type });
    expect(specificButton.length).toBe(1);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });
});

test('if each type button works', () => {
  renderWithRouter(<App />);

  // typesArr.forEach((type) => {
  // const specificButton = screen.getByRole('button', { name: type });
  // expect(specificButton).toBeInTheDocument();
  // userEvent.click(specificButton);
  // Tentando checkar que o estado de pokedex tal fica igual ao type ?????????
  // });
  const button = screen.getByRole('button', { name: 'Electric' });
  userEvent.click(button);
  const pokemon = screen.getByText('Pikachu');
  expect(pokemon).toBeInTheDocument();
});

test('if the fire button work', () => {
  renderWithRouter(<App />);

  const button = screen.getByRole('button', { name: 'Fire' });
  userEvent.click(button);
  const pokemon = screen.getByText('Charmander');
  expect(pokemon).toBeInTheDocument();
});

test('if the bug button work', () => {
  renderWithRouter(<App />);

  const button = screen.getByRole('button', { name: 'Bug' });
  userEvent.click(button);
  const pokemon = screen.getByText('Caterpie');
  expect(pokemon).toBeInTheDocument();
});

test('if the poison button work', () => {
  renderWithRouter(<App />);

  const button = screen.getByRole('button', { name: 'Poison' });
  userEvent.click(button);
  const pokemon = screen.getByText('Ekans');
  expect(pokemon).toBeInTheDocument();
});

test('if the psychic button work', () => {
  renderWithRouter(<App />);

  const button = screen.getByRole('button', { name: 'Psychic' });
  userEvent.click(button);
  const pokemon = screen.getByText('Alakazam');
  expect(pokemon).toBeInTheDocument();
});

test('if the normal button work', () => {
  renderWithRouter(<App />);

  const button = screen.getByRole('button', { name: 'Normal' });
  userEvent.click(button);
  const pokemon = screen.getByText('Snorlax');
  expect(pokemon).toBeInTheDocument();
});

test('if the dragon button works', () => {
  renderWithRouter(<App />);

  const button = screen.getByRole('button', { name: 'Dragon' });
  userEvent.click(button);
  const pokemon = screen.getByText('Dragonair');
  expect(pokemon).toBeInTheDocument();
});

test('if the dragon button works', () => {
  renderWithRouter(<App />);

  const allButton = screen.getByRole('button', {
    name: 'All',
  });
  const pikachu = screen.getByText('Pikachu');
  expect(allButton).toBeInTheDocument();
  expect(pikachu).toBeInTheDocument();
});
