import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';

import App from '../App';
import pokemons from '../data';

describe('Testando se o Pokédex renderiza o que é pedido', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se a página renderiza um título com o texto "Encountered pokémons"', () => {
    const getText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(getText).toBeInTheDocument();
  });
});

describe('Testando se é exibido o Pokémon qundo clicado no botão', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se existe o botão "Próximo pokémon" e se ele contém o texto esperado', () => {
    const haveButton = screen.getByText(/Próximo pokémon/i);
    expect(haveButton).toBeInTheDocument();
    expect(haveButton).toHaveTextContent(/Próximo pokémon/i);
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    pokemons.forEach((pokemon) => {
      const nextButton = screen.getByText(/Próximo pokémon/i);
      expect(nextButton).toBeInTheDocument();

      const pokeInScreen = screen.getByTestId('pokemon-name');

      if (pokemon.name === 'Pikachu') {
        expect(pokeInScreen).toHaveTextContent(pokemon.name);
      } else {
        userEvent.click(nextButton);
        expect(pokeInScreen).toHaveTextContent(pokemon.name);
      }
    });
  });

  it('Testa se volta a mostrar o primeiro pokémon após o último', () => {
    const listNamePoke = pokemons.map((pokemon) => pokemon.name);

    const nextButton = screen.getByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();

    for (let index = 0; index < listNamePoke.length; index += 1) {
      userEvent.click(nextButton);
    }

    const pokeInScreen = screen.getByTestId('pokemon-name');
    expect(pokeInScreen).toHaveTextContent(`${listNamePoke[0]}`);
  });
});

describe('Testando os botões de filtro', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  let buttons;

  it('Testa se os botões da tela estão sendo renderizados', () => {
    const buttonAll = screen.getByText(/All/i);
    expect(buttonAll).toBeInTheDocument();

    buttons = [...new Set(pokemons.map((pokemon) => pokemon.type))];

    buttons.forEach((button, index) => {
      const getButtons = screen.getAllByTestId(/pokemon-type-button/i);
      expect(getButtons[index]).toHaveTextContent(button);
    });
  });

  it('Testa se os pokemons são filtrados conforme o esperado', () => {
    buttons.forEach((button) => {
      const getButton = screen.getByRole('button', {
        name: button,
      });
      expect(getButton).toBeInTheDocument();

      userEvent.click(getButton);

      const getPoke = screen.getByTestId('pokemon-type');
      expect(getPoke).toHaveTextContent(button);
    });
  });

  it('Testa se existe na tela o botão de resetar', () => {
    const resetButton = screen.getByRole('button', {
      name: /All/i,
    });
    expect(resetButton).toBeInTheDocument();

    userEvent.click(resetButton);

    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      const getPoke = screen.getByText(name);
      expect(getPoke).toHaveTextContent(name);
      userEvent.click(nextButton);
    });
  });
});
