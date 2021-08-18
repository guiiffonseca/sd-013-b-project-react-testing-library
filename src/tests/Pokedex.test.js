import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

const name = 'pokemon-name';

describe('Component Pokedex tests', () => {
  it('should have a heading with text Encountered pokemons', () => {
    renderWithRouter(<App />);

    const pokedexText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexText).toBeInTheDocument();
  });

  it('should show the next pokemon when clicks the button Proximo pokemon', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    const newPokemon = screen.getByTestId(name);
    expect(newPokemon).toHaveTextContent('Charmander');
  });

  it('should select the pokemons by type when the specific button is clicked', () => {
    renderWithRouter(<App />);

    const allButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allButtons[1]).toHaveTextContent('Fire');
    userEvent.click(allButtons[2]);
    const selectedPokemon = screen.getByTestId(name);
    expect(selectedPokemon).toHaveTextContent('Caterpie');
  });

  it('should have the button all that ends the type filter', () => {
    renderWithRouter(<App />);

    const selectAllButton = screen.getByRole('button', { name: /all/i });
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allButtons[3]).toHaveTextContent('Poison');
    userEvent.click(allButtons[3]);
    let selectedPokemon = screen.getByTestId(name);
    expect(selectedPokemon).toHaveTextContent('Ekans');
    userEvent.click(selectAllButton);
    selectedPokemon = screen.getByTestId(name);
    expect(selectedPokemon).toHaveTextContent('Pikachu');
  });
});
