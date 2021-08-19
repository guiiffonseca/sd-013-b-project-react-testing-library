import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testar o componente Pokedex.js', () => {
  test('Testar se página contém um h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const encounteredPoke = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémon/i,
    });
    expect(encounteredPoke).toBeInTheDocument();
  });

  test('Testar se é exibido o próximo Pokémon quando o botão é clicado.', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(buttonNext);
    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();

    const clicks = 7;
    for (let i = 0; i < clicks; i += 1) {
      userEvent.click(buttonNext);
    }
    const lastPokemon = screen.getByText('Dragonair');
    expect(lastPokemon).toBeInTheDocument();

    userEvent.click(buttonNext);
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Testar se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const onlyOne = screen.getByText('Pikachu');
    expect(onlyOne).toBeInTheDocument();
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(buttonNext.textContent).not.toEqual('Pikachu');
  });

  test('Testar se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const buttonsLength = 7;
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toEqual(buttonsLength);

    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();

    const bugType = screen.getByRole('button', {
      name: /bug/i,
    });
    expect(bugType).toBeInTheDocument();
    userEvent.click(bugType);
    expect(pokemon).toHaveTextContent('Caterpie');

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    expect(pokemon).toHaveTextContent('Pikachu');
  });
});
