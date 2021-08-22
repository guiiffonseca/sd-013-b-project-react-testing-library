import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('teste', () => {
  const pokemons = [/Pikachu/, /Charmander/, /Caterpie/, /Ekans/,
    /Alakazam/, /Mew/, /Rapidash/, /Snorlax/, /Dragonair/, /Pikachu/];
  const pokemonsType = ['Electric', 'Fire',
    'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

  it(`Ao entrar na página verifica se contém um
   heading h2 com o texto "Encountered pokémons".`, () => {
    renderWithRouter(<App />);

    const encounteredText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(encounteredText).toBeInTheDocument();
  });

  it(`Ao entrar na página verifica se é exibido o próximo 
  Pokémon da lista quando o "botão Próximo pokémon" é clicado.`, () => {
    renderWithRouter(<App />);

    const buttonText = screen.getByRole('button', { name: 'Próximo pokémon' });

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      userEvent.click(buttonText);
    });
  });

  it('Ao entrar na página verifica se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemonCard = screen.getAllByTestId('pokemon-name');
    expect(pokemonCard.length).toBe(1);
  });

  it('Ao entrar na página verifica se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    /* TESTA SE TEM UM BOTÃO DE FITRAGEM PARA CADA TIPO DE POKÉMON, SEM REPETIÇÃO */
    pokemonsType.forEach((filter) => {
      expect(screen.getAllByRole('button', {
        name: filter,
      }).length).toBe(1);
    });

    /* TESTA SE A PARTIR DA SELEÇÃO DE UM TIPO, A POKÉDEX CIRCULA SOMENTE PELOS POKÉMONS DAQUELE TIPO */
    pokemonsType.forEach((type) => {
      const pokemonTypeButton = screen.getByRole('button', { name: type });
      userEvent.click(pokemonTypeButton);

      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType.innerHTML).toBe(type);
    });

    /* TESTA SE O TEXTO DO BOTÃO CORRESPONDE AO NOME DO TIPO DO POKEMON E SE O BOTÃO "All" ESTAR SEMPRE VISIVEL */
    pokemonsType.forEach((type, index) => {
      const pokemonTypeButton = screen.getAllByTestId('pokemon-type-button');
      expect(pokemonTypeButton[index].innerHTML).toBe(type);

      const buttonAll = screen.getByRole('button', { name: 'All' });
      expect(buttonAll).toBeInTheDocument();
    });
  });

  it(`Ao entrar na página verifica se Pokédex 
  contém um botão para resetar o filtro`, () => {
    renderWithRouter(<App />);

    const buttonName = screen.getByRole('button', { name: 'All' });
    expect(buttonName).toBeInTheDocument();

    const buttonText = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(buttonName);
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      userEvent.click(buttonText);
    });
  });
});
