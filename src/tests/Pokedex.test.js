import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste componente Pokedex', () => {
  const pokemons = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
    'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

  const typePokemon = ['Electric', 'Fire',
    'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

  test('Testa se a pagina tem um h2', () => {
    renderWithRouter(<App />);
    const foundText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(foundText).toBeInTheDocument();
  });

  test('Testar próximo pokemon', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });

  test('Quando entrar na página verifica se há um pokemon por vez', () => {
    renderWithRouter(<App />);
    const onlyPokemon = screen.getAllByTestId('pokemon-name');
    expect(onlyPokemon.length).toBe(1);
  });

  test('Ao entrar na página verifica se ha filtro', () => {
    renderWithRouter(<App />);
    // teste se há botão para filtrar cada tipo de pokemon

    typePokemon.forEach((filter) => {
      expect(screen.getAllByRole('button', {
        name: filter,
      }).length).toBe(1);
    });

    // testa se o pokemon selecionando pelo tipo está correto
    typePokemon.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      userEvent.click(buttonType);

      const typespokemon = screen.getByTestId('pokemon-type');
      expect(typespokemon.innerHTML).toBe(type);
    });

    // testa se o botão contem o tipo do pokemon
    typePokemon.forEach((type, index) => {
      const pokemonTypeButton = screen.getAllByTestId('pokemon-type-button');
      expect(pokemonTypeButton[index].innerHTML).toBe(type);

      const buttonAll = screen.getByRole('button', { name: 'All' });
      expect(buttonAll).toBeInTheDocument();
    });
  });

  test('Quando entrar na página verifica se há Pokdéx', () => {
    renderWithRouter(<App />);
    const nameButton = screen.getByRole('button', { name: 'All' });
    expect(nameButton).toBeInTheDocument();

    const textButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nameButton);
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      userEvent.click(textButton);
    });
  });
});
