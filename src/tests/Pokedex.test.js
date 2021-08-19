import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste componente Pokedex', () => {
  const nextBtnName = 'Próximo pokémon';

  const pokemonType = 'pokemon-type-button';

  it('Verifica se contém o texto "Encountered pokémons" na página', () => {
    renderWithRouter(<App />);

    const textPagePokedex = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(textPagePokedex).toBeInTheDocument();
  });

  it('Verifica se contém na página o botão com o texto "Próximo Pokemon"', () => {
    renderWithRouter(<App />);

    const textPagePokedex = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(textPagePokedex).toBeInTheDocument();
  });

  it('Verifica se ao clicar o próximo pokémon é mostrado', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button', {
      name: nextBtnName,
    });

    const pikachuName = screen.getByText(pokemons[0].name);
    expect(pikachuName).toBeInTheDocument();
    userEvent.click(btnNext);
    const charmanderName = screen.getByText(pokemons[1].name);
    expect(charmanderName).toBeInTheDocument();
  });

  it('Verifica se mostra o primeiro pokémon ao clicar no último', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button', {
      name: nextBtnName,
    });

    const pikachuName = screen.getByText(pokemons[0].name);
    expect(pikachuName).toBeInTheDocument();
    for (let index = 0; index < pokemons.length; index += 1) {
      userEvent.click(btnNext);
    }
    expect(pikachuName).toBeInTheDocument();
  });

  it('Verifica se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    for (let index = 0; index < pokemons.length; index += 1) {
      const pokemonName = screen.getAllByTestId('pokemon-name').length;
      expect(pokemonName).toBe(1);
    }
  });

  it('Verifica se contém botão de filtro para cada pokémon', () => {
    renderWithRouter(<App />);

    const filterPokemons = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    filterPokemons.forEach((filter) => {
      const btnTypePokemon = screen.getByRole('button', {
        name: filter,
      });
      expect(btnTypePokemon).toBeInTheDocument();
    });
  });

  it('Verifica se o pokemon é correspondente ao tipo selecionado no botão', () => {
    renderWithRouter(<App />);

    const typePikachu = screen.getAllByTestId(pokemonType)[0];
    expect(typePikachu).toHaveTextContent(/Electric/i);
    const typeCharmander = screen.getAllByTestId(pokemonType)[1];
    expect(typeCharmander).toHaveTextContent(/Fire/i);
    const typeCaterpie = screen.getAllByTestId(pokemonType)[2];
    expect(typeCaterpie).toHaveTextContent(/Bug/i);
  });

  it('Verifica se ao clicar no botão "All" todos pokémons são mostrados', () => {
    renderWithRouter(<App />);

    const BtnAll = screen.getByRole('button', {
      name: /All/i,
    });

    userEvent.click(BtnAll);
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(pokemon.name);
      const btnNext = screen.getByRole('button', {
        name: nextBtnName,
      });
      userEvent.click(btnNext);
    });
  });
});
