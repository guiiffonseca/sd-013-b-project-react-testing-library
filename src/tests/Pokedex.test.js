import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Pokedex from '../components/Pokedex';
import Data from '../data';

function renderWithRouter(componentToRender) {
  const customHistory = createMemoryHistory();

  return {
    ...render(
      <Router history={ customHistory }>
        {componentToRender}
      </Router>,
    ),
    history: customHistory,
  };
}

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

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(
      <Pokedex pokemons={ Data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const componentHeading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(componentHeading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista ao click do botão Próximo.', () => {
    renderWithRouter(
      <Pokedex pokemons={ Data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const buttonNext = screen.getByTestId('next-pokemon');
    expect(buttonNext).toHaveTextContent('Próximo pokémon');

    userEvent.click(buttonNext);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Charmander');

    userEvent.click(buttonNext);
    const pokemon3 = screen.getByText('Caterpie');
    expect(pokemon3).toBeInTheDocument();

    userEvent.click(buttonNext);
    const pokemon4 = screen.getByText('Ekans');
    expect(pokemon4).toBeInTheDocument();

    userEvent.click(buttonNext);
    const pokemon5 = screen.getByText('Alakazam');
    expect(pokemon5).toBeInTheDocument();

    userEvent.click(buttonNext);
    const pokemon6 = screen.getByText('Mew');
    expect(pokemon6).toBeInTheDocument();

    userEvent.click(buttonNext);
    const pokemon7 = screen.getByText('Rapidash');
    expect(pokemon7).toBeInTheDocument();

    userEvent.click(buttonNext);
    const pokemon8 = screen.getByText('Snorlax');
    expect(pokemon8).toBeInTheDocument();

    userEvent.click(buttonNext);
    const pokemonLast = screen.getByText('Dragonair');
    expect(pokemonLast).toBeInTheDocument();

    userEvent.click(buttonNext);
    const pokemonFist = screen.getByText('Pikachu');
    expect(pokemonFist).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(
      <Pokedex pokemons={ Data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const button = screen.getByTestId('next-pokemon');
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    const componentImg = screen.getAllByRole('img');
    expect(componentImg).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(
      <Pokedex pokemons={ Data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const number = 7;
    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    expect(buttonFilter).toHaveLength(number);

    expect(buttonFilter[0]).toHaveTextContent('Electric');
    expect(buttonFilter[1]).toHaveTextContent('Fire');
    expect(buttonFilter[2]).toHaveTextContent('Bug');
    expect(buttonFilter[3]).toHaveTextContent('Poison');
    expect(buttonFilter[4]).toHaveTextContent('Psychic');
    expect(buttonFilter[5]).toHaveTextContent('Normal');
    expect(buttonFilter[6]).toHaveTextContent('Dragon');

    const component = screen.getByTestId('pokemon-type');
    userEvent.click(buttonFilter[0]);
    expect(component).toHaveTextContent('Electric');
    userEvent.click(buttonFilter[1]);
    expect(component).toHaveTextContent('Fire');
    userEvent.click(buttonFilter[2]);
    expect(component).toHaveTextContent('Bug');
    userEvent.click(buttonFilter[3]);
    expect(component).toHaveTextContent('Poison');
    userEvent.click(buttonFilter[4]);
    expect(component).toHaveTextContent('Psychic');
    userEvent.click(buttonFilter[5]);
    expect(component).toHaveTextContent('Normal');
    userEvent.click(buttonFilter[6]);
    expect(component).toHaveTextContent('Dragon');

    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex pokemons={ Data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const button = screen.getAllByRole('button');
    expect(button[0]).toHaveTextContent('All');
    userEvent.click(button[0]);
    const component = screen.getByTestId('pokemon-type');
    expect(component).toHaveTextContent('Electric');

    const componentImg = screen.getAllByRole('img');
    expect(componentImg).toHaveLength(1);
  });
});
