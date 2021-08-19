import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Test of the component <Pokedex /> ', () => {
  test('Verify id Pokedex contains correct title', () => {
    renderWithRouter(<App />);
    const titlePokedex = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(titlePokedex).toBeInTheDocument();
  });

  test('Verify that click in button next pokémon show in screen', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });
    userEvent.click(buttonNextPokemon);
    const nextPokemon = screen.getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Verify if show in screen one pokemon by time', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getAllByText(/more details/i);
    expect(linkMoreDetails.length).toBe(1);
  });

  test('Verify if Pokedex contains all buttons of filter', () => {
    renderWithRouter(<App />);
    const buttonsFilters = screen.getAllByTestId('pokemon-type-button');
    const sizeButtons = 7;
    expect(buttonsFilters.length).toBe(sizeButtons);

    const buttonFire = screen.getByRole('button', {
      name: 'Fire',
    });
    const buttonNext = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    userEvent.click(buttonFire);
    userEvent.click(buttonNext);
    const cardRapidash = screen.getByText('Rapidash');
    expect(cardRapidash).toBeInTheDocument();
  });
  test('Verify if this page contains reset button', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', {
      name: 'All',
    });
    userEvent.click(resetButton);
    const cardPikachu = screen.getByText(/pikachu/i);
    expect(cardPikachu).toBeInTheDocument();
  });
});
