import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

const pokemonName = 'pokemon-name';
const pokemonTypeButton = 'pokemon-type-button';
const pokemonType = 'pokemon-type';

describe('Test Pokedex Component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('should have a h2 whit text', () => {
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });
  test('After click "Próximo pokémon" it list the next pokemon', () => {
    const buttonNext = screen.getByText(/Próximo pokémon/i);
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Charmander/i);
    userEvent.click(buttonNext);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Caterpie/i);
    userEvent.click(buttonNext);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Ekans/i);
    const rest = 5;
    for (let index = 0; index <= rest; index += 1) {
      userEvent.click(buttonNext);
    }
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Pikachu/i);
  });
  test('if only show a single pokemon', () => {
    expect(screen.getAllByTestId(pokemonName).length).toBe(1);
  });
  test('if there is a fliter button', () => {
    expect(screen.getAllByTestId(pokemonTypeButton)[0]).toHaveTextContent(/Electric/i);
    expect(screen.getAllByTestId(pokemonTypeButton)[1]).toHaveTextContent(/Fire/i);
    expect(screen.getAllByTestId(pokemonTypeButton)[2]).toHaveTextContent(/Bug/i);
    expect(screen.getAllByTestId(pokemonTypeButton)[3]).toHaveTextContent(/Poison/i);
    userEvent.click(screen.getAllByTestId(pokemonTypeButton)[0]);
    expect(screen.getByText(/all/i));
    expect(screen.getByTestId(pokemonType)).toHaveTextContent(/Electric/i);
    userEvent.click(screen.getAllByTestId(pokemonTypeButton)[1]);
    expect(screen.getByText(/all/i));
    expect(screen.getByTestId(pokemonType)).toHaveTextContent(/Fire/i);
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/all/i));
    expect(screen.getByTestId(pokemonType)).toHaveTextContent(/Fire/i);
  });
  test('if here is a All button and works', () => {
    const buttonALl = screen.getByText(/all/i);
    const nextButton = screen.getByText(/Próximo pokémon/i);
    expect(buttonALl).toBeInTheDocument();
    userEvent.click(buttonALl);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/pikachu/i);
    userEvent.click(nextButton);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Charmander/i);
    userEvent.click(nextButton);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Caterpie/i);
  });
});
