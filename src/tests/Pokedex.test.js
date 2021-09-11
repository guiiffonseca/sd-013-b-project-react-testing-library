import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './Utils/utils';

const pokemonName = 'pokemon-name';
describe('Teste Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(
      <App />,
    );
  });
  test('Verifica se a página contém um h2 com o texto "Encountered pokémons"', () => {
    const headingText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2 });
    expect(headingText).toBeInTheDocument();
  });

  test('Verifica se é exibido o próximo pokémon', () => {
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);
    const nextPokemon = screen.getByTestId(pokemonName);
    expect(nextPokemon).toHaveTextContent(/Charmander/);

    userEvent.click(nextButton);
    expect(nextPokemon).toHaveTextContent(/Caterpie/);
    const six = 6;
    for (let index = 0; index <= six; index += 1) {
      userEvent.click(nextButton);
    }
    expect(nextPokemon).toHaveTextContent(/Pikachu/);
  });

  test('Verifica se é mostrado um pokemon por vez', () => {
    const dataTestId = pokemonName;
    expect(screen.getAllByTestId(dataTestId).length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    const dataTestId = 'pokemon-type';
    expect(filterButton[0]).toHaveTextContent(/Electric/);
    expect(filterButton[1]).toHaveTextContent(/Fire/);
    expect(filterButton[2]).toHaveTextContent(/Bug/);
    expect(filterButton[3]).toHaveTextContent(/Poison/);
    userEvent.click(filterButton[0]);
    expect(screen.getByTestId(dataTestId)).toHaveTextContent(/Electric/);
    const allButton = screen.getByRole('button', { name: /All/ });
    expect(allButton).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const nextPokemon = screen.getByTestId(pokemonName);

    const allButton = screen.getByRole('button', { name: /All/ });
    expect(allButton).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/ });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(allButton);
    expect(nextPokemon).toHaveTextContent(/Pikachu/);

    userEvent.click(nextButton);
    expect(nextPokemon).toHaveTextContent(/Charmander/);

    userEvent.click(nextButton);
    expect(nextPokemon).toHaveTextContent(/Caterpie/);
  });
});
