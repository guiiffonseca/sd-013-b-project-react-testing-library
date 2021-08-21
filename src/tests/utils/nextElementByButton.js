import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './renderWithRouter';

export default function nextElementByButton(btnName, name, type, weight) {
  renderWithRouter(<App />);

  const btn = screen.getByRole('button', {
    name: btnName,
  });
  const pokemonName = screen.getByTestId('pokemon-name');
  const pokemonType = screen.getByTestId('pokemon-type');
  const pokemonWeight = screen.getByTestId('pokemon-weight');

  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
  expect(pokemonName).toHaveTextContent(name);
  expect(pokemonType).toHaveTextContent(type);
  expect(pokemonWeight).toHaveTextContent(`Average weight: ${weight} kg`);
}
