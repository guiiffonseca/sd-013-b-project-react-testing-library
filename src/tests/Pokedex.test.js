import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste de Pokemons ', () => {
  test('Teste se há um h2 na tela', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Se o botão deve conter o texto Próximo pokémon e leva até ele', () => {
    renderWithRouter(<App />);
    const testButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(testButton).toBeInTheDocument();
    userEvent.click(testButton);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  test('Teste no botao de filtragem', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getByRole('button', {
      name: 'Fire',
    });
    expect(filterButton).toBeInTheDocument();
  });

  test('Deve existir um botão de filtragem para cada tipo ', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const number = 7;
    expect(allButtons.length).toBe(number);
  });
});

test('Deve existir um botao de nome All', () => {
  renderWithRouter(<App />);
  const allButton = screen.getByRole('button', {
    name: 'All',
  });
  expect(allButton).toBeInTheDocument();
  userEvent.click(allButton);
  const pikachu = screen.getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
});
