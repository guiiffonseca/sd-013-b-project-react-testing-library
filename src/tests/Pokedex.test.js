import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa o componente Pokedex', () => {
  test('testa se a pagina contem um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });
  test('testa se é exibido o pokémon ao clicar no botão próximo pokemon', () => {
    renderWithRouter(<App />);

    const nextPokemonBtn = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemonBtn).toBeInTheDocument();
    userEvent.click(nextPokemonBtn);
    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();

    const clicks = 7;
    for (let i = 0; i < clicks; i += 1) {
      userEvent.click(nextPokemonBtn);
    }
    const dragonair = screen.getByText('Dragonair');
    expect(dragonair).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    const btn = 7;
    const testId = screen.getAllByTestId('pokemon-type-button');
    expect(testId.length).toEqual(btn);
  });
  test('testa se contém um botão de filtro', () => {
    renderWithRouter(<App />);

    const buttonFilter = screen.getByRole('button', {
      name: 'Psychic',
    });
    expect(buttonFilter).toBeInTheDocument();
  });
  test('testa se contém um botão All', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
