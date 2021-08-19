import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './utils/RenderWithRouter';
import pokemons from '../data';

const pokemonTypes = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

function forAllPokemon() {
  pokemons.forEach(() => {
    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemonBtn);

    const allBtn = screen.getByText('All');
    expect(allBtn).toHaveTextContent('All');
  });
}

describe('Testa o componente Pokedex.js', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons.', () => {
    RenderWithRouter(<App />);

    const encounteredText = screen.getByRole('heading', { level: 2 });

    expect(encounteredText).toHaveTextContent(/encountered pokémon/i);
  });

  test('se é exibido o próximo Pokémon da lista quando o '
    + 'botão Próximo pokémon é clicado.', () => {
    RenderWithRouter(<App />);

    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      const pokemonWeight = screen.getByTestId('pokemon-weight');

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonWeight).toBeInTheDocument();

      userEvent.click(nextPokemonBtn);
    });

    const pikachuName = screen.getByText('Pikachu');
    expect(pikachuName).toBeInTheDocument();
    expect(nextPokemonBtn).toHaveTextContent('Próximo pokémon');
  });

  test('se a Pokédex tem os botões de filtro.', () => {
    RenderWithRouter(<App />);

    const pokemonTypeBtn = screen.getAllByTestId('pokemon-type-button');

    pokemonTypes.forEach((type, index) => {
      userEvent.click(pokemonTypeBtn[index]);

      const pokemonType = screen.getByTestId('pokemon-type');
      const allBtn = screen.getByText('All');

      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonTypeBtn[index]).toHaveTextContent(type);
      expect(allBtn).toHaveTextContent('All');
    });

    expect(pokemonTypeBtn.length).toBe(pokemonTypes.length);
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    RenderWithRouter(<App />);

    const allBtn = screen.getByText('All');

    forAllPokemon();
    userEvent.click(allBtn);
    forAllPokemon();
  });
});
