import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../unit/renderWithRouter';
import pokemons from '../data';

describe('Requisito 5', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const buttonName = 'Próximo pokémon';
  const pokemonName = 'pokemon-name';
  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const typeBtnTestId = 'pokemon-type-button';

  test('Teste se página contém um heading h2 com o texto "Encountered pokémons".', () => {
    const heading2 = screen.getByRole('heading',
      { level: 2, name: (content) => content.includes('Encountered pokémons') });
    expect(heading2).toBeInTheDocument();
  });

  test('O botão deve conter o texto "Próximo pokémon"', () => {
    const nextPokemonbutton = screen.getByRole('button', { name: buttonName });
    expect(nextPokemonbutton).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão'
  + '"Próximo pokémon" é clicado', () => {
    const firstPokemon = screen.getByTestId(pokemonName);
    const nextPokemonbutton = screen.getByRole('button', { name: buttonName });
    pokemons.forEach((_pokemon, index) => {
      if (index < pokemons.length - 1) {
        fireEvent.click(nextPokemonbutton);
        const thisPokemon = screen.getByTestId(pokemonName);
        expect(thisPokemon).toHaveTextContent(pokemons[index + 1].name);
      } else {
        fireEvent.click(nextPokemonbutton);
        expect(firstPokemon).toHaveTextContent(pokemons[0].name);
      }
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const pokemonOneScreen = screen.getAllByTestId(pokemonName);
    expect(pokemonOneScreen).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const pokemonBtnFilter = screen.getAllByTestId(typeBtnTestId);
    expect(pokemonBtnFilter).toHaveLength(types.length);
  });

  test('Deve existir um botão de filtragem para cada tipo de Pokémon.', () => {
    const pokemonBtnFilter = screen.getAllByTestId(typeBtnTestId);
    pokemonBtnFilter.forEach(
      (button, index) => expect(button.textContent).toBe(types[index]),
    );
    expect(pokemonBtnFilter).toHaveLength(types.length);
  });

  test('a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const psychButtonType = screen.getByRole('button', { name: 'Psychic' });
    fireEvent.click(psychButtonType);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Psychic');
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    const pokemonBtnFilter = screen.getAllByTestId(typeBtnTestId);
    pokemonBtnFilter.forEach(
      (button, index) => expect(button.textContent).toBe(types[index]),
    );
  });

  test('O botão All precisa estar sempre visível', () => {
    const pokemonBtnAll = screen.getAllByTestId(typeBtnTestId);
    const btnAll = screen.getByRole('button', { name: 'All' });
    pokemonBtnAll.forEach((button) => {
      fireEvent.click(button);
      expect(btnAll).toBeInTheDocument();
    });
  });

  test('O texto do botão deve ser All', () => {
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toHaveTextContent('All');
  });
});

test('A Pokedéx deverá mostrar todos os pokemons,'
 + 'quando o botão All for clicado', () => {
  const { history } = renderWithRouter(<App />);
  expect(history.location.pathname).toBe('/');
  const btnAll = screen.getByRole('button', { name: 'All' });
  fireEvent.click(btnAll);
  const nextPokemonbutton = screen.getByRole('button', { name: 'Próximo pokémon' });
  pokemons.forEach((pokemon) => {
    const pokemonActual = screen.getByTestId('pokemon-name');
    expect(pokemonActual).toHaveTextContent(pokemon.name);
    fireEvent.click(nextPokemonbutton);
  });
});
