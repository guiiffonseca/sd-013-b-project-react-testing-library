import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('if component Pokedex.js is working properly', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('should display message "Encountered pokémons"', () => {
    const pokedexText = screen.getByRole('heading', {
      level: 2,
    });
    expect(pokedexText.textContent).toBe('Encountered pokémons');
  });

  it('should display a button with a text "Próximo pokémon"', () => {
    const nextPokemonButton = screen.getByTestId('next-pokemon');
    expect(nextPokemonButton.textContent).toBe('Próximo pokémon');
  });

  it('should display the next pokémon of the list when button is clicked', () => {
    const pokemon = pokemons.map(({ name }) => name); // gets the name of the pokemon from "pokemons";
    const nextButton = screen.getByTestId('next-pokemon'); // recovers "Próximo pokémon" button;
    pokemon.forEach((poke) => { // for each name of pokemon returned...
      expect(screen.getByText(poke)).toBeInTheDocument(); // it should be in the document
      userEvent.click(nextButton); // then fires "Próximo pokémon" event
    });
    expect(screen.getByText('Pikachu')).toBeInTheDocument(); // back to the first.
  });

  it('should have a reset button which cleans the filter', () => {
    const pokemon = pokemons.map(({ name }) => name); // gets the name of the pokemon from "pokemons";
    const allPokemon = screen.getByText(/All/i); // recovers the element with "All" text;
    const nextButton = screen.getByText(/Próximo pokémon/i); // recovers the element with "Próximo pokemon" text;
    userEvent.click(allPokemon); // when user clicks "All" button...
    pokemon.forEach((poke) => { // for each name of pokemon returned...
      expect(screen.getByText(poke)).toBeInTheDocument(); // it should be in the document
      userEvent.click(nextButton); // then fires "Próximo pokémon" event
    });
    expect(screen.getByText('Pikachu')).toBeInTheDocument(); // first pokemon is displayed, meaning the filter is reseted.
  });

  it('should work only with the choosen type of pokémon', () => {
    const pokemon = pokemons.map(({ type }) => type); // gets the type of the pokemon from "pokemons";
    const pokeTypeButton = screen.getAllByTestId('pokemon-type-button'); // recovers the element with "pokemon-type-button" textId;
    const filterByType = pokeTypeButton.map((filter) => filter.textContent); // maps the text of the button;
    const checkFilter = pokemon.every((type) => filterByType.includes(type)); // which...
    expect(checkFilter).toBe(true); // should includes the type of the pokemon.
  });
});
