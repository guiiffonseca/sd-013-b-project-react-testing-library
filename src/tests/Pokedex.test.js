import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

beforeEach(() => renderWithRouter(<App />));
const pokemonName = 'pokemon-name';

describe('Testa a renderização do componente Pokedex', () => {
//   beforeEach(() => renderWithRouter(<App />));
  test('Deveria existir um h2 com o texto: Encountered pokémons', () => {
    const h2Text = screen.getByRole('heading', { level: 2 });
    expect(h2Text).toHaveTextContent('Encountered pokémons');
  });
});

describe('Testa se é exibido o proximo pokemon da lista ao cliar no botão', () => {
//   beforeEach(() => renderWithRouter(<App />));
  test('Deveria conter o texto "Proximo pokemon" no botão ', () => {
    const nextBtn = screen.getByText(/próximo pokémon/i);

    expect(nextBtn).toHaveTextContent(/próximo pokémon/i);
  });

  test('Deveria exibir o proximo pokemon da lista', () => {
    const nextBtn = screen.getByText(/próximo pokémon/i);
    const pokemon = screen.getByTestId(pokemonName);

    userEvent.click(nextBtn);
    expect(pokemon).toBeInTheDocument();
    expect(pokemon).toHaveTextContent(/charmander/i);
  });
  test('Deveria exibir o primeiro pokemon se o botão for acionado no ultimo', () => {
    const nextBtn = screen.getByText(/próximo pokémon/i);
    const pokemon = screen.getByTestId(pokemonName);
    userEvent.click(nextBtn);
    for (let index = 1; index <= pokemons.length; index += 1) {
      userEvent.click(nextBtn);
      if (pokemon.name === 'Pikachu') {
        expect(pokemon).toHaveTextContent(pokemon.name);
      }
    }
  });
});
describe('Testa se é exibido um pokemon por vez', () => {
//   beforeEach(() => renderWithRouter(<App />));
  test('Deveria exibir apenas um pokemon por vez', () => {
    const pokemon = screen.getAllByTestId(pokemonName);
    expect(pokemon).toHaveLength(1);
  });
});
describe('Testa se existem os botôes de filtro', () => {
//   beforeEach(() => renderWithRouter(<App />));
  test('Deveria existir apenas um botão de filtragem para cada pokemon', () => {
    const btn = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
    btn.forEach((type, index) => {
      const btnType = screen.getAllByTestId('pokemon-type-button');
      expect(btnType[index]).toHaveTextContent(type);
    });
  });
  test('Deveria filtrar os pokemons', () => {
    pokemons.forEach((element) => {
      const filtering = screen.getByRole('button', { name: element.type });
      expect(filtering).toBeInTheDocument();

      userEvent.click(filtering);
      const pokemonsOnFilter = screen.getByTestId('pokemon-type');
      expect(pokemonsOnFilter).toHaveTextContent(element.type);
    });
  });
});
describe('Testa se contem o botão para resetar o filtro', () => {
  test('Deveria existir o botão com o text: All', () => {
    const btn = screen.getByText('All');
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);
    const nextBtn = screen.getByTestId('next-pokemon');

    pokemons.forEach((pokemon) => {
      const current = screen.getByText(pokemon.name);
      expect(current).toBeInTheDocument();
      fireEvent.click(nextBtn);
    });
  });
});
