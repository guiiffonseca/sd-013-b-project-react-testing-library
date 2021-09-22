import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a pagina Pokedex', () => {
  test('Verifica se tem um h2 na pagina', () => {
    renderWithRouter(<App />);

    const pokedexh2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(pokedexh2).toBeInTheDocument();
  });

  test('Testando o botao next Pokemon', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    const pokeName = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    expect(buttonNext).toBeInTheDocument();

    userEvent.click(buttonNext);

    expect(pokeName).toBeInTheDocument();
    expect(type).toBeInTheDocument();
  });

  test('Testando botoes de filtro de tipo do pokemon', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });
    const eventButton = screen.getByRole('button', {
      name: 'Fire',
    });
    const pokeName = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');

    userEvent.click(buttonAll);

    expect(pokeName).toHaveTextContext('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(screen.getByAltText('Pikachu sprite')).toBeInTheDocument();

    userEvent.click(eventButton);

    expect(pokeName).toHaveTextContent('Charmander');
    expect(type).toHaveTextContent('Fire');
    expect(screen.getAllByAltText('Charmander sprite'));
  });

  test('Testa se a pagina tem todos os botoes do filtro', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const buttonMount = 7;
    expect(buttons.length).toBe(buttonMount);
  });
});
