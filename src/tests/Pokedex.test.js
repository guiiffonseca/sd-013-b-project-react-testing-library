import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../components/utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testes da pokedex', () => {
  test('testa se a page tem um h2 com certo texto', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
    const pikachu = screen.getByText(pokemons[0].name);
    expect(pikachu).toBeInTheDocument();
  });
  test('testa se renderiza os botoes de filtragem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const buttons = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    buttons.forEach((button) => {
      const typeButton = screen.getByRole('button', {
        name: button,
      });
      expect(typeButton).toBeInTheDocument();
    });
  });
  test('testa se selecionar tipo de pokemons, aparece apenas pokemons desse tipo', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const buttons = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(buttons[0]);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    userEvent.click(buttons[1]);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    userEvent.click(buttons[2]);
    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
  });
  test('testa se contem um botao para resetar o filtro', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const buttonAll = screen.getByText(/all/i);
    userEvent.click(buttonAll);
    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    pokemons.forEach((pokemon) => {
      const pokeName = screen.getByText(pokemon.name);
      expect(pokeName).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
  });
});
