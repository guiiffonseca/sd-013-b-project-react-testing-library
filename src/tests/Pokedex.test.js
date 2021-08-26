import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('A págona contém um heading h2 com o texto "Encountered pokémons"', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });

  test('Mosta o próximo pokémon quando o botão de próximo é clicado', () => {
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  test('Mostra apenas um pokémon por vez', () => {
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('A pokédex possui botões de filtro', () => {
    const filters = screen.getAllByTestId('pokemon-type-button');
    const pkTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(filterButtons.length).toBe(types.length);

    filters.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(pkTypes[index]);
    });
    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
  });

  test('A pokédex tem um botão para resetar os filtros', () => {
    const resetBtn = screen.getByRole('button', {
      name: /All/i,
    });
    expect(resetBtn).toBeInTheDocument();
    expect(resetBtn).toHaveTextContent('All');
    userEvent.click(resetBtn);
  });
});
