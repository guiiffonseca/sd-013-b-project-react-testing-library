import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Pokedex } from '../components';
import pokemons from '../data';

const favorite = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: true,
  151: false,
};

const nextPokemonTestId = 'next-pokemon';
const pokemonNameTestId = 'pokemon-name';
const pokemonTypeButtonTestId = 'pokemon-type-button';

describe('Test Pokedex.js', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />
      </MemoryRouter>,
    );

    const pokedexHeadingText = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(pokedexHeadingText).toBeInTheDocument();
  });

  test('Se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />
      </MemoryRouter>,
    );

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    const buttonNextPokemon = screen.getByTestId(nextPokemonTestId);
    fireEvent.click(buttonNextPokemon);

    const secondPokemon = screen.getByText(/charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });

  test('Testando se é mostrado apenas um Pokémon por vez.', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />
      </MemoryRouter>,
    );

    const pokemon = screen.getAllByTestId(pokemonNameTestId);
    const pokemonLength = 1;
    expect(pokemon.length).toBe(pokemonLength);
  });

  test('Testando se a Pokédex tem os botões de filtro', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />
      </MemoryRouter>,
    );

    const pokemonName = screen.getByTestId(pokemonNameTestId);
    const filterButtons = screen.getAllByTestId(pokemonTypeButtonTestId);
    const filterButtonsLength = 7;
    expect(filterButtons.length).toBe(filterButtonsLength);

    const dragonButton = screen.getByRole('button', {
      name: /dragon/i,
    });
    expect(dragonButton.textContent).toBe('Dragon');

    fireEvent.click(dragonButton);

    expect(pokemonName.textContent).toBe('Dragonair');

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton.textContent).toBe('All');

    fireEvent.click(allButton);

    expect(pokemonName.textContent).toBe('Pikachu');

    const nextPokemon = screen.getByTestId('next-pokemon');
    expect(nextPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);

    expect(pokemonName.textContent).toBe('Charmander');
  });
});
