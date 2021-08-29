import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('Testando o componente Pokedex', () => {
  test('Se a página possui um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('Se é exibido o próximo pokémon ao clicar no botão "Próximo pokémon"', () => {
    renderWithRouter(<Pokedex />);
    const pikachu = screen.getByAltText(/Pikachu sprite/i);
    expect(pikachu).toBeInTheDocument();

    const nextButton = screen.getByText(/Próximo pokémon/i);
    fireEvent.click(nextButton);

    const charmander = screen.getByAltText(/Charmander sprite/i);
    expect(charmander).toBeInTheDocument();
  });
  test('Se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<Pokedex />);
    const pokemonCard = screen.getByTestId(/pokemon-name/i);
    expect(pokemonCard.length).toBe(1);
  });
  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex />);
    const allButton = screen.getByTestId(/button/i);
    expect(allButton).toBeInTheDocument();

    const filters = screen.getAllByTestId(/pokemon-type-button/i);
    expect(filters).toBeInTheDocument();

    const filterType = ['Eletric', 'Fire', 'Bug', 'Poison', 'Psych', 'Normal', 'Dragon'];
    expect(filters.length).toBe(filterType.length);

    filters.forEach((filter, index) => {
      expect(filter).toBeInTheDocument();
      expect(filter).toHaveTextContent(filterType[index]);
    });
  });
  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex />);
    const allButton = screen.getByTestId(/button/i);
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);
  });
});
