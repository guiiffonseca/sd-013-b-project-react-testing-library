import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('About the component Pokedex.js', () => {
  const getNextButton = () => screen.getByText(/Próximo pokémon/i);
  const getPokemonType = () => screen.getByTestId('pokemon-type');
  it('verifies if theres a heading with the correct text', () => {
    renderWithRouter(<App />);

    const actualHeading = screen.getByText(/Encountered/i).textContent;
    const expetedHeading = 'Encountered pokémons';

    expect(actualHeading).toBe(expetedHeading);
  });

  it('verifies if the button "next pokemon" works as it should~', () => {
    renderWithRouter(<App />);
    expect(getNextButton().textContent).toBe('Próximo pokémon');
    fireEvent.click(getNextButton());
    const nextPokemon = screen.getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
    fireEvent.click(getNextButton());
    const nextPokemon2 = screen.getByText(/Caterpie/i);
    expect(nextPokemon2).toBeInTheDocument();
  });

  it('verifies if only one pokemon is shown at a time', () => {
    renderWithRouter(<App />);

    const pokemonList = screen.getAllByTestId('pokemon-weight');
    const expectedLength = 1;

    expect(pokemonList.length).toBe(expectedLength);
  });

  it('verifies if pokedex has filter buttons', () => {
    renderWithRouter(<App />);

    const buttonList = screen.getAllByRole('button');
    buttonList.pop();
    for (let i = 0; i < buttonList.length; i += 1) {
      for (let j = i + 1; j < buttonList.length; j += 1) {
        expect(buttonList[i].textContent).not.toBe(buttonList[j].textContent);
      }
    }

    const specificButton = screen.getAllByTestId('pokemon-type-button')[1];
    fireEvent.click(specificButton);
    {
      const allButton = screen.getByText(/All/i);
      expect(allButton).toBeInTheDocument();
    }
    const displayedPokemonType = getPokemonType();
    expect(specificButton.textContent).toBe(displayedPokemonType.textContent);
    fireEvent.click(getNextButton());
    {
      const allButton = screen.getByText(/All/i);
      expect(allButton).toBeInTheDocument();
    }
    const displayedPokemonType2 = getPokemonType();
    expect(specificButton.textContent).toBe(displayedPokemonType2.textContent);
  });

  it('verifies if page has a button to reset filters~', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByText(/All/i);
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);
    const pokemonType1 = getPokemonType().textContent;
    fireEvent.click(getNextButton());
    const pokemonType2 = getPokemonType().textContent;
    expect(pokemonType1).not.toBe(pokemonType2);
    fireEvent.click(getNextButton());
    const pokemonType3 = getPokemonType().textContent;
    expect(pokemonType2).not.toBe(pokemonType3);
  });
});
