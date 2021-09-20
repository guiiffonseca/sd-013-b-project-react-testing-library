import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test the Pokedex.js', () => {
  test('if the page contains a heading h2 with the text "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading2 = screen.getByRole('heading',
      { name: 'Encountered pokémons', level: 2 });
    expect(heading2).toBeInTheDocument();
  });

  test('if is shows the next pokemon when click in the button', () => {
    renderWithRouter(<App />);
    pokemons.forEach(({ name }) => {
      const screenName = screen.getByTestId('pokemon-name');
      expect(screenName.textContent).toEqual(name);
      const next = screen.getByRole('button', { name: 'Próximo pokémon' });
      fireEvent.click(next);
    });
  });

  test('if it shows only one Pokemon at time', () => {
    renderWithRouter(<App />);
    const screenPokemons = screen.getAllByTestId('pokemon-name');
    expect(screenPokemons.length).toBe(1);
  });

  test('if every tipe of button shows only one time', () => {
    renderWithRouter(<App />);
    const screenButtons = screen.getAllByTestId('pokemon-type-button');
    const arrayOfPokemonTypes = pokemons.map(({ type }) => type);
    const types = [...new Set(arrayOfPokemonTypes)];
    expect(screenButtons.length).toEqual(types.length);
  });

  test('if the text of every button correspond to the type of the button', () => {
    renderWithRouter(<App />);
    const arrayOfPokemonTypes = pokemons.map(({ type }) => type);
    const types = [...new Set(arrayOfPokemonTypes)];
    types.forEach((type, index) => {
      const screenButtons = screen.getAllByTestId('pokemon-type-button');
      expect(screenButtons[index].innerHTML).toEqual(type);
    });
  });

  test('if the pokedex contains a button "All" to reset the filter', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: 'All' });
    fireEvent.click(all);
    expect(all).toBeInTheDocument();
  });
});
