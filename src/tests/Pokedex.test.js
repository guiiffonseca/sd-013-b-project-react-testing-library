import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokedex', () => {
  test('Se a página possui um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('Se é exibido o próximo pokémon ao clicar no botão "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const nextButton = screen.getByText(/Próximo pokémon/i);
    fireEvent.click(nextButton);

    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    fireEvent.click(nextButton);

    const caterpie = screen.getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();
    fireEvent.click(nextButton);
  });
  test('Se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonCard = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemonCard.length).toBe(1);
  });
  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButton = screen.getAllByTestId(/pokemon-type-button/i);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(filterButton.length).toBe(types.length);

    filterButton.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(types[index]);
    });

    const allButton = screen.getByRole('button', {
      name: /All/i,
    });

    expect(allButton).toBeInTheDocument();
  });
  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', {
      name: /All/i,
    });

    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent('All');

    fireEvent.click(allButton);
  });
});
