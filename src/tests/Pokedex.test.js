import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import RouterMemory from './RouterMemory';
import App from '../App';

describe('Requisito 5 Pokedex', () => {
  test('Verifica se há um h2 com o texto "Encountered pokémons"', () => {
    RouterMemory(<App />);

    const header = screen.getByRole('heading', { level: 2 });

    expect(header.textContent).toBe('Encountered pokémons');
  });

  test('Verifica se é exibido o próximo pokémon da lista', () => {
    RouterMemory(<App />);

    const pokemonPikachu = screen.getByText(/pikachu/i);
    expect(pokemonPikachu).toBeInTheDocument();

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextButton);
    const pokemonCharmander = screen.getByText(/charmander/i);
    expect(pokemonCharmander).toBeInTheDocument();
  });

  test('Verifique se a Pokédex possui os botões de filtro', () => {
    RouterMemory(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });

    const eletricButton = screen.getByRole('button', { name: /electric/i });
    expect(eletricButton).toHaveTextContent('Electric');

    const fireButton = screen.getByRole('button', { name: /fire/i });
    expect(fireButton).toHaveTextContent('Fire');

    const bugButton = screen.getByRole('button', { name: /bug/i });
    expect(bugButton).toHaveTextContent('Bug');

    const poisonButton = screen.getByRole('button', { name: /poison/i });
    expect(poisonButton).toHaveTextContent('Poison');

    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    expect(psychicButton).toHaveTextContent('Psychic');

    const normalButton = screen.getByRole('button', { name: /normal/i });
    expect(normalButton).toHaveTextContent('Normal');

    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    expect(dragonButton).toHaveTextContent('Dragon');
  });

  test('Verifique se há um botão "All"', () => {
    RouterMemory(<App />);
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });

    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
  });

  test('Verifique que a Pokédex contém um botão de resetar filtro', () => {
    RouterMemory(<App />);
    const resetButton = screen.getByRole('button', {
      name: /All/i,
    });

    userEvent.type(resetButton);
    expect(resetButton).toBeInTheDocument();
  });
});
