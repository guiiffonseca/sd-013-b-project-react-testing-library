import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

const NEXT_POKEMON = 'next-pokemon';
const TYPE_BUTTON = 'pokemon-type-button';

describe('Teste o componente <Pokedex.js />', () => {
  // afterAll();

  it('Possui um Heading h2 com texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText(/Encountered pokémons/);
    expect(heading).toBeInTheDocument();
  });
  it('Exibe o próximo pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId(NEXT_POKEMON)).toHaveTextContent('Próximo pokémon');

    userEvent.click(screen.getByTestId(NEXT_POKEMON));
    expect(screen.getByText('Charmander'));

    // Clica no botão próximo 'i' vezes igual a quantidade de pokemons
    for (let i = 1; i <= data.length - 1; i += 1) {
      userEvent.click(screen.getByTestId(NEXT_POKEMON));
    }
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
  it('Exibe um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonsOnScreen = screen.getAllByTestId('pokemon-name');
    expect(pokemonsOnScreen.length).toBe(1);
  });
  it('Exibe o botoes de filtro', () => {
    const QTY_FILTERS = 7;
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    renderWithRouter(<App />);

    const filtersOnScreen = screen.getAllByTestId(TYPE_BUTTON);
    expect(filtersOnScreen.length).toBe(QTY_FILTERS);

    const filtersTypesOnScreen = screen.getAllByTestId(TYPE_BUTTON);
    types.forEach((type, index) => {
      // Verifica se não repete o filtro e texto
      expect(filtersTypesOnScreen[index]).toHaveTextContent(type);

      // Verifica que exibe os pokémons conforme clicado no filtro
      userEvent.click(screen.getAllByTestId(TYPE_BUTTON)[index]);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);

      // Verifica se o botão All está habilitado
      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).toBeEnabled();
    });
  });
  it('Possui um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByTestId(NEXT_POKEMON);
    const filterButtons = screen.getAllByRole('button');
    userEvent.click(filterButtons[3]);
    userEvent.click(filterButtons[0]);
    data.forEach(() => userEvent.click(nextButton));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(filterButtons[0]).toHaveTextContent('All');
  });
});
