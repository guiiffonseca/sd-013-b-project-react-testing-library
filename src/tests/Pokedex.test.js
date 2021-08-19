import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pokedex from '../components/Pokedex';
import Data from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ Data } isPokemonFavoriteById={ { } } />
      </MemoryRouter>,
    );

    const componentHeading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(componentHeading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista ao click do botão Próximo.', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ Data } isPokemonFavoriteById={ { } } />
      </MemoryRouter>,
    );

    const pokemon1 = screen.getByText('Pikachu');
    expect(pokemon1).toBeInTheDocument();

    const button = screen.getByTestId('next-pokemon');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    const pokemon2 = screen.getByText('Charmander');
    expect(pokemon2).toBeInTheDocument();

    fireEvent.click(button);
    const pokemon3 = screen.getByText('Caterpie');
    expect(pokemon3).toBeInTheDocument();

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    const pokemonLast = screen.getByText('Dragonair');
    expect(pokemonLast).toBeInTheDocument();

    fireEvent.click(button);
    const pokemonFist = screen.getByText('Pikachu');
    expect(pokemonFist).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ Data } isPokemonFavoriteById={ { } } />
      </MemoryRouter>,
    );

    const button = screen.getByTestId('next-pokemon');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    const componentImg = screen.getAllByRole('img');
    expect(componentImg).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ Data } isPokemonFavoriteById={ { } } />
      </MemoryRouter>,
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
    fireEvent.click(buttonFilter[0]);
    expect(component).toHaveTextContent('Electric');
    fireEvent.click(buttonFilter[1]);
    expect(component).toHaveTextContent('Fire');
    fireEvent.click(buttonFilter[2]);
    expect(component).toHaveTextContent('Bug');
    fireEvent.click(buttonFilter[3]);
    expect(component).toHaveTextContent('Poison');
    fireEvent.click(buttonFilter[4]);
    expect(component).toHaveTextContent('Psychic');
    fireEvent.click(buttonFilter[5]);
    expect(component).toHaveTextContent('Normal');
    fireEvent.click(buttonFilter[6]);
    expect(component).toHaveTextContent('Dragon');

    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <MemoryRouter>
        <Pokedex pokemons={ Data } isPokemonFavoriteById={ { } } />
      </MemoryRouter>,
    );

    const button = screen.getAllByRole('button');
    expect(button[0]).toHaveTextContent('All');
    fireEvent.click(button[0]);
    const component = screen.getByTestId('pokemon-type');
    expect(component).toHaveTextContent('Electric');

    const componentImg = screen.getAllByRole('img');
    expect(componentImg).toHaveLength(1);
  });
});
