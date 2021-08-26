import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokedex test', () => {
  test('página possui texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const pokedexText = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(pokedexText).toBeInTheDocument();
  });

  test('página possui botão e mostra o próximo pokémon quando clicado', () => {
    renderWithRouter(<App />);

    const pokedexButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(pokedexButton).toBeInTheDocument();

    userEvent.click(pokedexButton);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    userEvent.click(pokedexButton);

    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();

    userEvent.click(pokedexButton);

    const ekans = screen.getByText('Ekans');
    expect(ekans).toBeInTheDocument();

    userEvent.click(pokedexButton);

    const alakazam = screen.getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();

    userEvent.click(pokedexButton);

    const mew = screen.getByText('Mew');
    expect(mew).toBeInTheDocument();

    userEvent.click(pokedexButton);

    const rapidash = screen.getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();

    userEvent.click(pokedexButton);

    const snorlax = screen.getByText('Snorlax');
    expect(snorlax).toBeInTheDocument();

    userEvent.click(pokedexButton);

    const dragonair = screen.getByText('Dragonair');
    expect(dragonair).toBeInTheDocument();

    userEvent.click(pokedexButton);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  test('página mostra apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonCard = screen.getAllByTestId('pokemon-name');
    expect(pokemonCard.length).toBe(1);
  });

  test('página possui botões de filtro', () => {
    renderWithRouter(<App />);

    const pokemonTypes = 7;
    const button = screen.getAllByTestId('pokemon-type-button');
    expect(button).toHaveLength(pokemonTypes);
    // expect(button.length).toBe(pokemonTypes);

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeInTheDocument();
  });

  test('página possui botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
