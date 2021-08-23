import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  const POKEMON_NAME_ID = 'pokemon-name';
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: true } }
    />);
    expect(screen.getByRole('heading', { level: 2 }).textContent)
      .toBe('Encountered pokémons');
  });
  test('Teste se o botão Próximo pokémon funciona', () => {
    renderWithRouter(<Pokedex
      pokemons={ [pokemons[0], pokemons[1]] }
      isPokemonFavoriteById={ { 25: true, 4: true } }
    />);
    const btn = screen.getByTestId('next-pokemon');
    fireEvent.click(btn);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ [pokemons[0], pokemons[1]] }
      isPokemonFavoriteById={ { 25: true, 4: true } }
    />);
    const pokemon = screen.getAllByTestId(POKEMON_NAME_ID);
    expect(pokemon.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: true, 65: true, 151: true } }
    />);
    const btns = screen.getAllByTestId('pokemon-type-button');
    const btnsLenght = 7;
    expect(btns.length).toBe(btnsLenght);
    fireEvent.click(btns[4]);
    expect(btns[4].textContent).toBe('Psychic');
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByTestId(POKEMON_NAME_ID).textContent).toBe('Alakazam');
    fireEvent.click(screen.getByTestId('next-pokemon'));
    expect(screen.getByTestId(POKEMON_NAME_ID).textContent).toBe('Mew');
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: true, 65: true, 151: true } }
    />);
    expect(screen.getByText('All')).toBeInTheDocument();
    const btns = screen.getAllByTestId('pokemon-type-button');
    fireEvent.click(btns[4]);
    expect(screen.getByTestId(POKEMON_NAME_ID).textContent).toBe('Alakazam');
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByTestId(POKEMON_NAME_ID).textContent).toBe('Pikachu');
  });
});
