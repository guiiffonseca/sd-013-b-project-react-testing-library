import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { Pokedex } from '../components';
import App from '../App';
import pokemons from '../data';

describe('testing cases of Pokedex component', () => {
  test('has a title of level 2 with the text "Encountered pokémons"', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons }
      />,
    );
    const pokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexTitle).toBeInTheDocument();
  });

  test('the next button have the text "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
  });

  test('show the next pokemon when click in next button', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByTestId('next-pokemon');
    userEvent.click(nextButton);
    const pokemonName = screen.getByText(/charmander/i);
    expect(pokemonName).toBeInTheDocument();
  });

  test('the Pokédex has filter buttons and next button', () => {
    renderWithRouter(<App />);
    const buttonContainer = screen.getAllByRole('button');
    const BUTTONS_LENGTH = 9;
    expect(buttonContainer).toHaveLength(BUTTONS_LENGTH);
  });

  test('click in button type show pokémons of this type', () => {
    renderWithRouter(<App />);
    const fireTypeButton = screen.getByRole('button', {
      name: /fire/i,
    });
    expect(fireTypeButton).toBeInTheDocument();
    userEvent.click(fireTypeButton);
    const pokemonName = screen.getByText(/charmander/i);
    expect(pokemonName).toBeInTheDocument();
    const nextButton = screen.getByTestId('next-pokemon');
    userEvent.click(nextButton);
    const nextPokemon = screen.getByText(/rapidash/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test(
    'click on type button show this pokémons, click on "All" button show first pokemon',
    () => {
      renderWithRouter(<App />);
      const fireTypeButton = screen.getByRole('button', {
        name: /fire/i,
      });
      expect(fireTypeButton).toBeInTheDocument();
      userEvent.click(fireTypeButton);
      const pokemonName = screen.getByText(/charmander/i);
      expect(pokemonName).toBeInTheDocument();
      const allButton = screen.getByRole('button', {
        name: /all/i,
      });
      userEvent.click(allButton);
      const firstPokemon = screen.getByText(/pikachu/i);
      expect(firstPokemon).toBeInTheDocument();
    },
  );

  test('has buttons of type of pokemons with right test id', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const TYPE_BUTTONS_LENGTH = 7;
    expect(typeButtons).toHaveLength(TYPE_BUTTONS_LENGTH);
  });
});
