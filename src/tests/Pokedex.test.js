import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste App ', () => {
  const PokemonsName = ['Pikachu',
    'Charmander',
    'Caterpie',
    'Ekans',
    'Alakazam',
    'Mew',
    'Rapidash',
    'Snorlax',
    'Dragonair',
  ];
  const buttons = ['Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];
  test('existe o titulo', () => {
    renderWithRouter(<App />);
    const titulo = screen.getByText('Encountered pokémons');
    expect(titulo).toBeInTheDocument();
  });

  test('Click Button Proximo', () => {
    renderWithRouter(<App />);
    const Button = screen.getByText('Próximo pokémon');
    expect(Button).toBeInTheDocument();

    PokemonsName.forEach((value) => {
      const name = screen.getByText(value);
      expect(name).toBeInTheDocument();
      userEvent.click(Button);
    });

    const INDEXDOUTLIMOPOKEMON = 8;
    PokemonsName.forEach((_, index) => {
      if (index === INDEXDOUTLIMOPOKEMON) {
        userEvent.click(Button);
        const PrimeiroPokemon = PokemonsName[0];
        expect(PrimeiroPokemon).toMatch('Pikachu');
      }
    });
  });

  test('Um pokemon por vez', () => {
    renderWithRouter(<App />);
    const Button = screen.getByText('Próximo pokémon');
    PokemonsName.forEach(() => {
      const name = screen.queryAllByTestId('pokemon-name').length;
      expect(name).toBe(1);
      userEvent.click(Button);
    });
  });

  test('Botões de filtro', () => {
    renderWithRouter(<App />);
    buttons.forEach((value) => {
      const Button = screen.getByRole('button', {
        name: value,
      });

      expect(Button).toBeInTheDocument();
      expect(Button).toHaveAttribute('data-testid', 'pokemon-type-button');
      const ButtonAll = screen.getByText('All');
      expect(ButtonAll).toBeInTheDocument();
    });
  });

  test('Botão All reseta o filtro?', () => {
    renderWithRouter(<App />);
    const ButtonAll = screen.getByText('All');
    userEvent.click(ButtonAll);
    const NamePokemon = screen.getByText(PokemonsName[0]);
    expect(NamePokemon).toBeInTheDocument();
  });
});
