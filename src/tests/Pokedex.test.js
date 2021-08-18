import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testa o componente "Pokedex.js" ', () => {
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
  test('Testa se contém um h2 Encountered pokémons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const encounteredPokemons = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(encounteredPokemons).toBeInTheDocument();
  });
  test('Testa se é exibido o próximo Pokémon da lista quando clicar no botão', () => {
    const clicks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonNextPokemon = screen.getByTestId('next-pokemon');
    expect(buttonNextPokemon.textContent).toBe('Próximo pokémon');
    const currentPokemon = screen.getByTestId('pokemon-name');
    expect(currentPokemon.textContent).toBe('Pikachu');
    clicks.forEach((click) => userEvent.click(buttonNextPokemon) === click);
    expect(currentPokemon.textContent).toBe('Dragonair');
    userEvent.click(buttonNextPokemon);
    expect(currentPokemon.textContent).toBe('Pikachu');
  });
  test('testa se é renderizado apenas um Pokemon por vez', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const currentPokemons = screen.getAllByTestId('pokemon-name');
    expect(currentPokemons.length).toBe(1);
  });
  test('Botões de filtro e circula somente pelos pokemons daquele tipo', () => {
    const pokemonsTypes = [
      'Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon',
    ];
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonsFilter = screen.getAllByTestId('pokemon-type-button');
    pokemonsTypes.forEach((type, index) => expect(buttonsFilter[index].textContent)
      .toBe(type));
    userEvent.click(buttonsFilter[2]);
    const pokemonNameText = screen.getByText('Caterpie');
    expect(pokemonNameText).toBeInTheDocument();
  });
  test('Testa se o texto do botão é o mesmo do tipo do pokemon', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(buttonFilter[2]);
    const pokemonTypeText = screen.getByTestId('pokemon-type').textContent;
    expect(buttonFilter[2].textContent).toBe(pokemonTypeText);
  });
  test('testa se o botão all está sempre visível', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonAll = screen.getAllByRole('button');
    expect(buttonAll[0].textContent).toBe('All');
    userEvent.click(buttonAll[0]);
  });
});
