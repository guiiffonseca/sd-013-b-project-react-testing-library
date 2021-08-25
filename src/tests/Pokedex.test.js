import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  const POKEMON = 'pokemon-name';

  it('Testa se a página contém um h2 sobre uma Pokédex', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon ao clicar em Próximo pokémon.', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();

    const pokemonId = screen.getByTestId(POKEMON);

    pokemons.forEach((pokemon, index) => {
      if (index === pokemons.length - 1) {
        expect(pokemonId.textContent).toBe(pokemon.name);
        fireEvent.click(button);
        expect(pokemonId.textContent).toBe(pokemons[0].name);
      } else {
        expect(pokemonId.textContent).toBe(pokemon.name);
        fireEvent.click(button);
      }
    });
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(POKEMON);
    expect(pokemon).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const categories = (
      ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon']
    );

    const buttons = screen.getAllByTestId('pokemon-type-button');
    buttons.forEach((type) => {
      expect(type).toBeInTheDocument();
    });

    categories.forEach((type) => {
      const buttonCategory = screen.getByRole('button', {
        name: type,
      });
      expect(buttonCategory).toBeInTheDocument();

      const pokemonsCategories = pokemons
        .filter((pokemon) => pokemon.type === type);
      fireEvent.click(buttonCategory);

      const button = screen.getByRole('button', { name: /Próximo pokémon/i });

      const nomePokemon = screen.getByTestId(POKEMON);
      pokemonsCategories.forEach((pokemon, index) => {
        if (index === pokemons.length - 1) {
          expect(nomePokemon.textContent).toBe(pokemon.name);
          fireEvent.click(button);
          expect(nomePokemon.textContent).toBe(pokemons[0].name);
        } if (pokemonsCategories.length === 1) {
          expect(nomePokemon.textContent).toBe(pokemon.name);
        } else {
          expect(nomePokemon.textContent).toBe(pokemon.name);
          fireEvent.click(button);
        }
      });
    });
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);
  });
});
