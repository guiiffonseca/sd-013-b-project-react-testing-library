import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokedex } from '../components';

const checkFilters = (filters) => {
  const checkedFilters = {};
  filters.forEach(({ textContent }) => {
    if (checkedFilters[textContent]) {
      return true;
    }
    checkedFilters[textContent] = 1;
  });
  return false;
};

describe('Testa página inicial na função pokedex', () => {
  const buttonTestId = 'next-pokemon';
  const pokemonNameTestId = 'pokemon-name';
  const pokemonTypeTestId = 'pokemon-type-button';

  describe('TESTA ITENS DA PÁGINA', () => {
    it('deve rederizar um heading 2', () => {
      renderWithRouter(<App />);
      const heading = screen.getByRole('heading', {
        level: 2,
        name: /Encountered pokémons/i,
      });
      expect(heading).toBeInTheDocument();
    });

    it('deve rederizar apenas um pokemon por vez', () => {
      renderWithRouter(<Pokedex
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ { 10: true, 4: true } }
      />);
      const visiblePokemon = screen.getAllByTestId(pokemonNameTestId);
      expect(visiblePokemon).toHaveLength(1);
    });

    it('deve mostrar 7 botões de filtro por tipo', () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 10: true, 4: true } }
      />);
      const typesOfPokemons = 7;

      const filters = screen.getAllByTestId(pokemonTypeTestId);
      const isThereAnyDuplicateFilter = checkFilters(filters);
      expect(filters).toHaveLength(typesOfPokemons);
      expect(isThereAnyDuplicateFilter).toBeFalsy();
    });

    it('deve rederizar botão para o próximo pokemon', () => {
      renderWithRouter(<Pokedex
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ { 10: true, 4: true } }
      />);
      const nextPokemon = screen.getByTestId(buttonTestId);
      expect(nextPokemon).toBeInTheDocument();
      expect(nextPokemon.textContent).toBe('Próximo pokémon');
    });
  });

  describe('TESTA FUNCIONALIDADES DA PÁGINA', () => {
    it('deve mostrar o proximo pokemon quando o botao é clicado', () => {
      renderWithRouter(<Pokedex
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ { 10: true, 4: true } }
      />);
      const nextPokemon = screen.getByTestId(buttonTestId);

      fireEvent.click(nextPokemon);
      expect(screen.getByTestId(pokemonNameTestId).textContent).toBe('Charmander');
      fireEvent.click(nextPokemon);
      expect(screen.getByTestId(pokemonNameTestId).textContent).toBe('Caterpie');
    });

    it('deve retornar ao primeiro pokemon quando chegar ao final da lista',
      () => {
        renderWithRouter(<Pokedex
          pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
          isPokemonFavoriteById={ { 10: true, 4: true } }
        />);
        const nextPokemon = screen.getByTestId(buttonTestId);
        expect(screen.getByTestId(pokemonNameTestId).textContent).toBe('Pikachu');
        fireEvent.click(nextPokemon);
        expect(screen.getByTestId(pokemonNameTestId).textContent).toBe('Charmander');
        fireEvent.click(nextPokemon);
        expect(screen.getByTestId(pokemonNameTestId).textContent).toBe('Caterpie');
        fireEvent.click(nextPokemon);
        expect(screen.getByTestId(pokemonNameTestId).textContent).toBe('Pikachu');
      });

    it('deve passar apenas pelos pokemons que correspondem ao filtro', () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 10: true, 4: true } }
      />);
      const filterButtons = screen.getAllByTestId(pokemonTypeTestId);
      const psychicButton = filterButtons[4];
      const nextPokemon = screen.getByTestId(buttonTestId);

      expect(psychicButton.textContent).toBe('Psychic');
      fireEvent.click(psychicButton);

      expect(screen.getByTestId(pokemonNameTestId).textContent).toBe('Alakazam');
      fireEvent.click(nextPokemon);

      expect(screen.getByTestId(pokemonNameTestId).textContent).toBe('Mew');
      fireEvent.click(nextPokemon);

      expect(screen.getByTestId(pokemonNameTestId).textContent).toBe('Alakazam');
    });
    it('deve resetar filtro quando o botão All é clicado', () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 10: true, 4: true } }
      />);
      const buttonAll = screen.getByText(/all/i);
      const filterButtons = screen.getAllByTestId(pokemonTypeTestId);
      const psychicButton = filterButtons[4];

      expect(buttonAll).toBeInTheDocument();
      fireEvent.click(psychicButton);

      expect(screen.getByTestId(pokemonNameTestId).textContent).toBe('Alakazam');
      fireEvent.click(buttonAll);

      expect(screen.getByTestId(pokemonNameTestId).textContent).toBe('Pikachu');
    });
  });
});
