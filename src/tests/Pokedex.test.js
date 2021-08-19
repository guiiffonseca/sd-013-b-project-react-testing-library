import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('h2 com o texto', () => {
  renderWithRouter(<App />);
  const title = screen.getByRole('heading', {
    name: /encountered pokémons/i,
    level: 2,
  });
  expect(title).toBeInTheDocument();
});

test('Próximo pokémon', () => {
  renderWithRouter(<App />);
  const pokemon1 = screen.getByText(/pikachu/i);
  expect(pokemon1).toBeInTheDocument();
  const nextButton = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  userEvent.click(nextButton);
  const pokemon2 = screen.getByText(/charmander/i);
  expect(pokemon2).toBeInTheDocument();
});
test('filtros', () => {
  renderWithRouter(<App />);
  const buttons = screen.getAllByTestId('pokemon-type-button');
  buttons.forEach((button) => {
    expect(button).toBeInTheDocument();
  });
  const eleButton = screen.getByRole('button', { name: /electric/i });
  expect(eleButton).toHaveTextContent('Electric');
  const firButton = screen.getByRole('button', { name: /fire/i });
  expect(firButton).toHaveTextContent('Fire');
  const bugButton = screen.getByRole('button', { name: /bug/i });
  expect(bugButton).toHaveTextContent('Bug');
  const poiButton = screen.getByRole('button', { name: /poison/i });
  expect(poiButton).toHaveTextContent('Poison');
  const psyButton = screen.getByRole('button', { name: /psychic/i });
  expect(psyButton).toHaveTextContent('Psychic');
  const norButton = screen.getByRole('button', { name: /normal/i });
  expect(norButton).toHaveTextContent('Normal');
  const draButton = screen.getByRole('button', { name: /dragon/i });
  expect(draButton).toHaveTextContent('Dragon');
});

test('All', () => {
  renderWithRouter(<App />);
  const allButton = screen.getByRole('button', {
    name: /all/i,
  });

  expect(allButton).toBeInTheDocument();
  userEvent.click(allButton);
});
