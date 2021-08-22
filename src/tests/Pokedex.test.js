import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Pokedex.js', () => {
  const buttonProx = 'Próximo pokémon';
  test('testa se contem um h2 "Encountered pokémons."', () => {
    renderWithRouter(<App />);

    const textHeading = screen.getByRole('heading', {
      name: /encountered pokémons/i,

    });
    expect(textHeading).toBeInTheDocument();
  });
  test(`testa se o próximo Pokémon da lista é exebido quando o 
    botão "Proximo pokémon" é clicado e tem o nome "Próximo pokémon"`, () => {
    renderWithRouter(<App />);
    const textButton = screen.getByRole('button', {
      name: buttonProx,
    });

    userEvent.click(textButton);

    const proxPokemon = screen.getByText('Charmander');
    expect(proxPokemon).toBeInTheDocument();
  });

  test(`testa se o Primeiro Pokémon é mostrado quando esta 
    no ultimo Pokémon la lista e  mostra um Pokemon por vez`, () => {
    renderWithRouter(<App />);

    const funcPokemon = (pokem) => {
      const proxPokemon = expect(screen.getByText(pokem)).toBeInTheDocument();
      return proxPokemon;
    };

    const textButton = screen.getByRole('button', {
      name: buttonProx,
    });

    userEvent.click(textButton);
    funcPokemon('Charmander');

    userEvent.click(textButton);
    funcPokemon('Caterpie');

    userEvent.click(textButton);
    funcPokemon('Ekans');

    userEvent.click(textButton);
    funcPokemon('Alakazam');

    userEvent.click(textButton);
    funcPokemon('Mew');

    userEvent.click(textButton);
    funcPokemon('Rapidash');

    userEvent.click(textButton);
    funcPokemon('Snorlax');

    userEvent.click(textButton);
    funcPokemon('Dragonair');

    userEvent.click(textButton);
    funcPokemon('Pikachu');
  });

  test('testa se a Pokédex tem os botões de "filtro"', () => {
    renderWithRouter(<App />);

    const buttonFilter = (params) => {
      const filterButton = expect(screen.getByRole('button', { name: params }))
        .toBeInTheDocument();
      return filterButton;
    };
    buttonFilter('Electric');
    buttonFilter('Fire');
    buttonFilter('Bug');
    buttonFilter('Poison');
    buttonFilter('Psychic');
    buttonFilter('Normal');
    buttonFilter('Dragon');
  });

  test(`testa ao selecionar um botão de tipo a Pokedex mostra
    somente os pokemon do tipo selecionado`, () => {
    renderWithRouter(<App />);

    const typeButton = screen.getByRole('button', { name: 'Psychic' });
    userEvent.click(typeButton);

    const type = screen.getByText('Alakazam');
    expect(type).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextButton);

    const type2 = screen.getByText('Mew');
    expect(type2).toBeInTheDocument();
  });

  test('testa se a Pokédex contem um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);

    const beginPokemon = screen.getByText('Pikachu');
    expect(beginPokemon).toBeInTheDocument();
  });
});
