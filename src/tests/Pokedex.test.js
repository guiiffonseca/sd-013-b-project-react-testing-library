import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test 5 - testing Pokedex', () => {
  it('TEst if the page show a heading', () => {
    renderWithRouter(<App />);

    const headingPokedex = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(headingPokedex).toBeInTheDocument();
  });
  it('Test if next pokemon button works properly', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    userEvent.click(nextPokemonButton);

    const pokemonOnScreen = screen.getByText(/Charmander/i);
    expect(pokemonOnScreen).toBeInTheDocument();
  });

  it('Test if only one pokemon is on the screen', () => {
    renderWithRouter(<App />);

    const onlyOnePokemon = screen.getAllByTestId('pokemon-name');
    expect(onlyOnePokemon).toHaveLength(1);
  });

  it('Test pokemons filter button', () => {
    renderWithRouter(<App />);

    const pokemonFilterButton = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonFilterButton[0]).toHaveTextContent('Electric');

    const Types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    pokemonFilterButton.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(Types[index]);
    });
  });

  it('Test all button', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByText(/All/i);
    const pokemonName = screen.getByTestId('pokemon-name');

    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
