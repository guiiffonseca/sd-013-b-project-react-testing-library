import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../components/renderWithRouter';
import data from '../data';

describe('Testa o componente Pokedex', () => {
  const pokemonRol = [data[1], data[2], data[3]];
  const favorites = { 4: true, 10: true, 23: true };
  const pokemonNameTestId = 'pokemon-name';
  it('Testa se existe um h2 com o texto "Encountered Pokemon"', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemonRol }
      isPokemonFavoriteById={ favorites }
    />);
    const h2 = screen.getByRole('heading', { level: 2 });

    expect(h2.textContent).toBe('Encountered pokémons');
  });

  it('Testa se o pŕoximo Pokémon da lista aparece quando botão é clicado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemonRol }
      isPokemonFavoriteById={ favorites }
    />);
    const nextPokemon = screen.getByTestId('next-pokemon');

    expect(nextPokemon.textContent).toBe('Próximo pokémon');

    fireEvent.click(nextPokemon);
    const pokemon1 = screen.getByTestId(pokemonNameTestId);

    expect(pokemon1.textContent).toBe('Caterpie');

    fireEvent.click(nextPokemon);
    const pokemon2 = screen.getByTestId(pokemonNameTestId);

    expect(pokemon2.textContent).toBe('Ekans');

    fireEvent.click(nextPokemon);
    const pokemon0 = screen.getByTestId(pokemonNameTestId);

    expect(pokemon0.textContent).toBe('Charmander');
  });

  it('Testa se pokemons são mostrados um a um', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemonRol }
      isPokemonFavoriteById={ favorites }
    />);
    const pokemonShown = screen.getAllByTestId(pokemonNameTestId);

    expect(pokemonShown.length).toBe(1);
  });

  it('Testa se a pokedex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ favorites }
    />);

    const typesArray = data.map((x) => x.type);
    const typesSet = new Set(typesArray);
    const numberOfTypes = typesSet.size;
    const uniqueTypes = [...typesSet];

    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    expect(filterBtns.length).toBe(numberOfTypes);
    for (let i = 0; i < uniqueTypes.length; i += 1) {
      expect(filterBtns[i].textContent).toBe(uniqueTypes[i]);
    }

    const allBtn = screen.getByText('All');
    expect(allBtn).toBeInTheDocument();
  });

  it('Testa se a Pokedex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemonRol }
      isPokemonFavoriteById={ favorites }
    />);

    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByText('All');
    const bugBtn = filterBtns[2];

    fireEvent.click(bugBtn);
    fireEvent.click(allBtn);

    const pokemonShown = screen.getByTestId(pokemonNameTestId);

    expect(pokemonShown.textContent).toBe('Charmander');
  });
});
