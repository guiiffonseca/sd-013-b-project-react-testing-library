import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o Pokedex.js', () => {
  const pikachu = pokemons[0];
  const isPokemonFavoriteById = pikachu;
  const buttonProximo = 'Próximo pokémon';
  const elementPokemonName = 'pokemon-name';
  const pokemonTypeButton = 'pokemon-type-button';
  const elementPokemonType = 'pokemon-type';

  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
  });

  test('Testa se contém um h2 com o texto Encountered pokémons', () => {
    let msg = screen.getByText(/Encountered pokémons/i);
    expect(msg).toBeInTheDocument();

    msg = screen.getByRole('heading', {
      level: 2,
    });
    expect(msg).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista', () => {
    const nextButton = screen.getByRole('button', {
      name: buttonProximo,
    });
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);
    const pokemonName = screen.getByTestId(elementPokemonName);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pokemons[1].name);
  });

  test('Testa o 1º Pokémon da lista deve ser mostrado após o ultimo', () => {
    const nextButton = screen.getByRole('button', {
      name: buttonProximo,
    });
    expect(nextButton).toBeInTheDocument();

    for (let index = 0; index < pokemons.length; index += 1) {
      fireEvent.click(nextButton);
    }
    const pokemonName = screen.getByTestId(elementPokemonName);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    const nextButton = screen.getByRole('button', {
      name: buttonProximo,
    });
    expect(nextButton).toBeInTheDocument();

    let pokemonName = screen.getAllByTestId(elementPokemonName);
    expect(pokemonName.length).toBe(1);

    for (let index = 0; index < pokemons.length; index += 1) {
      fireEvent.click(nextButton);
    }

    pokemonName = screen.getAllByTestId(elementPokemonName);
    expect(pokemonName.length).toBe(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    const pokemonTypes = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], [])),
    ];
    const allButtons = screen.getAllByTestId(pokemonTypeButton);
    expect(allButtons.length).toBe(pokemonTypes.length);
  });

  test('Testa se Pokédex circula somente pelos pokémons do tipo selecionado', () => {
    const fireButton = screen.getByRole('button', {
      name: 'Fire',
    });
    expect(fireButton).toBeInTheDocument();
    fireEvent.click(fireButton);
    const pokemonType = screen.getByTestId(elementPokemonType);
    expect(pokemonType).toHaveTextContent('Fire');
  });

  test('Testa se o texto do botão corresponde ao nome do tipo', () => {
    const pokemonTypes = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], [])),
    ];
    const allButtons = screen.getAllByTestId(pokemonTypeButton);
    allButtons.forEach((button, indice) => {
      expect(button).toHaveTextContent(pokemonTypes[indice]);
    });
  });

  test('Testa se o botão All esta sempre visível.', () => {
    const allButtons = screen.getAllByTestId(pokemonTypeButton);
    allButtons.forEach((button) => {
      fireEvent.click(button);
      const allButton = screen.getByRole('button', {
        name: 'All',
      });
      expect(allButton).toBeInTheDocument();
    });
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const fireButton = screen.getByRole('button', {
      name: 'Fire',
    });
    fireEvent.click(fireButton);

    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    fireEvent.click(allButton);
    const pokemonType = screen.getByTestId(elementPokemonType);
    expect(pokemonType).toHaveTextContent(pokemons[0].type);
  });

  test('Testa se ao carregar a página, o filtro selecionado é All', () => {
    const pokemonType = screen.getByTestId(elementPokemonType);
    expect(pokemonType).toHaveTextContent(pokemons[0].type);
  });
});
