import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente Pokedex.js', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const titlePokedex = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(titlePokedex).toBeInTheDocument();
  });

  test('Exibe o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextPokemon).toBeInTheDocument();

    pokemons.forEach((pokemon, index) => {
      const namePokemon = screen.getByTestId('pokemon-name');
      expect(namePokemon).toHaveTextContent(`${pokemon.name}`);
      userEvent.click(nextPokemon);

      if (pokemons.length - 1 === index) {
        expect(namePokemon).toHaveTextContent('Pikachu');
      }
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getAllByTestId('pokemon-name');
    expect(namePokemon.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const fetchPokemonTypes = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

    fetchPokemonTypes.forEach((typePokemon, index) => {
      const typeBtn = screen.getAllByTestId('pokemon-type-button');
      expect(typeBtn[index]).toHaveTextContent(typePokemon);
    });
  });

  test('Exibir os pokemons de acordo com os botões', () => {
    renderWithRouter(<App />);

    const fetchPokemonTypes = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

    fetchPokemonTypes.forEach((type) => {
      const typeBtn = screen.getByRole('button', { name: type });
      userEvent.click(typeBtn);
      const typePokemon = screen.getByTestId('pokemon-type');
      console.log(typePokemon);
      expect(typePokemon).toHaveTextContent(type);
    });
  });

  test('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });

    userEvent.click(btnAll);

    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemons.forEach((pokemon) => {
      const namePokemon = screen.getByText(pokemon.name);
      expect(namePokemon).toBeInTheDocument();
      userEvent.click(btnNext);
    });

    expect(btnAll).toBeInTheDocument();
  });
});
