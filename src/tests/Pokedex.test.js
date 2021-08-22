import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('', () => {
  renderWithRouter(<App />);

  const headingPokedex = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(headingPokedex).toBeInTheDocument();

  const buttons = screen.getAllByTestId('pokemon-type-button');
  const numberOoFilters = 7;
  expect(buttons.length).toBe(numberOoFilters);

  const buttonAll = screen.getByTestId('pokemon-all-button');
  expect(buttonAll).toHaveTextContent('All');
  const nextPokemon = screen.getByTestId('next-pokemon');
  expect(nextPokemon).toBeInTheDocument();

  const filterBurrtons = screen.getAllByTestId('pokemon-type-button');
  const numberOfButtons = 7;
  expect(filterBurrtons.length).toBe(numberOfButtons);
  expect(filterBurrtons[0]).toHaveTextContent('Electric');
});
