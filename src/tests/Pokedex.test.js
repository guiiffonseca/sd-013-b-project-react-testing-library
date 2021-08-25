import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pikachuId = 25;
const charmanderId = 4;
const mockFavoritePokemonIds = [pikachuId, charmanderId];
const mockIsPokemonFavoriteById = pokemons.reduce((acc, { id }) => {
  acc[id] = mockFavoritePokemonIds.includes(id);
  return acc;
}, {});

describe('5. Testa o componente `<Pokedex.js />`', () => {
  it('Testa se contém um heading `h2` com o texto `Encountered pokémons`.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ mockIsPokemonFavoriteById }
    />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se o botão contêm o texto `Próximo pokémon`;', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    expect(screen.queryByText(pokemons[0].name)).toBeInTheDocument();
    expect(screen.queryByText(pokemons[1].name)).toBeNull();
    expect(screen.queryByText(pokemons[8].name)).toBeNull();

    Array.from({ length: pokemons.length - 1 })
      .forEach(() => userEvent.click(button));
    expect(screen.queryByText(pokemons[8].name)).toBeInTheDocument();
    expect(screen.queryByText(pokemons[0].name)).toBeNull();
    userEvent.click(button);
    expect(screen.queryByText(pokemons[0].name)).toBeInTheDocument();
    expect(screen.queryByText(pokemons[8].name)).toBeNull();
  });

  it('Testa  se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const allButton = screen.getByRole('button', { name: /all/i });
    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    typeButtons.forEach((typeButton) => {
      userEvent.click(typeButton);
      const actualName = screen.queryByTestId('pokemon-name');
      const { name } = pokemons.find(({ type }) => type === typeButton.innerHTML);
      expect(actualName).toHaveTextContent(name);
    });

    userEvent.click(allButton);
    const actualName = screen.queryByTestId('pokemon-name');
    expect(actualName).toHaveTextContent(pokemons[0].name);
  });
});
