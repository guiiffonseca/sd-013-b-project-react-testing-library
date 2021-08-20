import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  const pokemonIdName = 'pokemon-name';
  test('verifica se página contém um heading h2 com o texto Encountered pokémons ',
    () => {
      renderWithRouter(<App />);

      const h2 = screen.getByRole('heading', {
        level: 2,
        name: /Encountered pokémons/i,
      });
      expect(h2).toBeInTheDocument();
    });
  test(`Verifica se é exibido o próximo Pokémon da 
  lista quando o botão Próximo pokémon é clicado`,
  () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();

    pokemons.map(({ name }) => {
      userEvent.click(buttonNext);
      const pokemon = screen.getByTestId(pokemonIdName, {
        name,
      });
      return expect(pokemon).toBeInTheDocument();
    });
  });

  test('Verifica se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const showOnePokemon = screen.getAllByTestId(pokemonIdName);
    expect(showOnePokemon).toHaveLength(1);
  });

  test('Verifica que deve existir um botao de cada tipo', () => {
    renderWithRouter(<App />);
    const typesPokemons = 7;
    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(typesPokemons);
    const fireButton = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(fireButton);
    const cardCharmander = screen.getByText(/charmander/i);
    expect(cardCharmander).toBeInTheDocument();

    const buttonAll = screen.getByText(/All/i);
    expect(buttonAll).toBeInTheDocument();
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro ', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: /all/i,
    });

    expect(button).toBeInTheDocument();
    userEvent.click(button);

    // verifica si tem so 1 pokemon na tela
    const allPokemon = screen.getAllByTestId('pokemon-name');

    expect(allPokemon).toHaveLength(1);
  });
});
