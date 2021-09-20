import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

const NEXT_POKEMON = 'next-pokemon';

describe('Teste o componente <Pokedex.js />', () => {
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
    expect(screen.getByText('Pikachu'));
  });
  it('Exibe um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonsOnScreen = screen.getAllByTestId('pokemon-name');
    expect(pokemonsOnScreen.length).toBe(1);
  });
  it('Exibe o botoes de filtro', () => {
    const QTY_FILTERS = 7;
    renderWithRouter(<App />);
    const filtersOnScreen = screen.getAllByTestId('pokemon-type-button');
    expect(filtersOnScreen.length).toBe(QTY_FILTERS);

  });
  /* it('Exibe o próximo pokémon', () => {
    renderWithRouter(<App />);

  }); */
});
