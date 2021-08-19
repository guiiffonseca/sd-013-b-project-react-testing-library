import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';
import Pokemons from '../data';

describe('Testando o "Pokedex"', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  it('montagem de h2 pokedex', () => {
    renderWithRouter(<Pokedex
      pokemons={ Pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const h2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });
  const pokemonTestID = 'pokemon-name';
  it('testando botão próximo pokemon', () => {
    renderWithRouter(<Pokedex
      pokemons={ Pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const btnNextPokemon = screen.getByTestId('next-pokemon');
    expect(btnNextPokemon).toBeInTheDocument();
    expect(btnNextPokemon).toHaveTextContent('Próximo pokémon');
    const pokemon = screen.getByTestId(pokemonTestID);

    userEvent.click(btnNextPokemon);
    const nextPokemon = screen.getByTestId(pokemonTestID);
    expect(pokemon).not.toHaveTextContent(nextPokemon);

    const nextPokemonLength = screen.getAllByTestId(pokemonTestID);
    expect(nextPokemonLength.length).toBe(1);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Testando se a Pokédex tem os botões de filtro', () => {
    const { history } = renderWithRouter(<App />);
    const numButtons = 7;
    const btnFilterPokemons = screen.getAllByTestId('pokemon-type-button');
    expect(btnFilterPokemons.length).toBe(numButtons);
    expect(btnFilterPokemons[0]).toHaveTextContent('Electric');
    expect(btnFilterPokemons[1]).toHaveTextContent('Fire');
    expect(btnFilterPokemons[2]).toHaveTextContent('Bug');
    expect(btnFilterPokemons[3]).toHaveTextContent('Poison');
    expect(btnFilterPokemons[4]).toHaveTextContent('Psychic');
    expect(btnFilterPokemons[5]).toHaveTextContent('Normal');
    expect(btnFilterPokemons[6]).toHaveTextContent('Dragon');
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
});
