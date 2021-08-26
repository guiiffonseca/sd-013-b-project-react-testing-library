import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';

const pokemonName = 'pokemon-name';

const checkIfAllButtonIsThere = () => {
  const allButton = screen.getByRole('button', {
    name: /all/i,
  });

  userEvent.click(allButton);

  const firstPokemon = screen.getByTestId(pokemonName, {
    name: pokemons[0].name,
  });

  expect(allButton).toBeInTheDocument();
  expect(firstPokemon).toBeInTheDocument();
};

const clickNextAndCheckName = (allPokemons, checkAllButton) => {
  allPokemons.forEach(({ name }) => {
    const nextButton = screen.getByTestId('next-pokemon');

    const current = screen.getByTestId(pokemonName).textContent;

    expect(current).toMatch(name);

    const foundPokemons = screen.getAllByTestId(pokemonName);

    expect(foundPokemons).toHaveLength(1);

    userEvent.click(nextButton);
  });

  const current = screen.getByTestId(pokemonName).textContent;

  expect(current).toMatch(allPokemons[0].name);

  if (checkAllButton) checkIfAllButtonIsThere();
};

describe('Testa o componente Pokedex.js', () => {
  beforeEach(() => {
    render(<MemoryRouter><App /></MemoryRouter>);
  });

  test('Deve conter o título /"Encountered Pokémons/"', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(title).toBeInTheDocument();
  });

  test('deve conter o próximo Pokémon da lista, exibindo apenas um por vez', () => {
    const nextButton = screen.getByTestId('next-pokemon');

    expect(nextButton).toHaveTextContent(/próximo pokémon/i);

    clickNextAndCheckName(pokemons);
  });

  test('Deve conter botões de filtro', () => {
    const allTypes = pokemons.reduce((types, { type }) => [...types, type], []);
    const allButtons = screen.getAllByTestId('pokemon-type-button');

    allTypes.forEach((type) => {
      const foundButtons = allButtons.filter((button) => button.textContent === type);
      expect(foundButtons).toHaveLength(1);
    });

    allButtons.forEach((button) => {
      userEvent.click(button);
      const pokemonsOftype = pokemons
        .filter((pokemon) => pokemon.type === button.textContent);

      clickNextAndCheckName(pokemonsOftype, 'checkAllButton');
    });
  });
});
