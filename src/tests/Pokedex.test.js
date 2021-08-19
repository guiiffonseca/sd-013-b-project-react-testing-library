import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from '../utils/renderWithRouter';
import pokemons from '../data';

describe('Testes da tela Pokédex', () => {
  function checkNextPoke() {
    const btn = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(btn).toBeInTheDocument();
    pokemons.forEach((poke) => {
      const pokemon = screen.getByTestId('pokemon-name');
      expect(poke.name).toBe(pokemon.innerHTML);
      userEvent.click(btn);
    });
  }
  const mockId = {
    25: false,
    4: false,
    10: false,
    23: false,
    65: false,
    151: false,
    78: false,
    143: false,
    148: false,
  };
  beforeEach(() => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ mockId } />);
  });

  it('Test heading', () => {
    const text = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(text).toBeInTheDocument();
  });
  it('Test Próximo pokémon btn', () => {
    checkNextPoke();
  });
  it('Check se existe apenas 1 pokémon', () => {
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });
  it('Testa botões de filtro', () => {
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonType = screen.getByTestId('pokemon-type');
    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    typeButtons.forEach((btn) => {
      userEvent.click(btn);
      expect(btn.innerHTML).toBe(pokemonType.innerHTML);
      expect(allButton).toBeEnabled();
    });
  });
  it('Test All button', () => {
    const allButton = screen.getByRole('button', {
      name: 'All',
    });
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allButton && typeButtons[0]).toBeInTheDocument();
    userEvent.click(typeButtons[0]);
    userEvent.click(allButton);
    checkNextPoke();
  });
});
