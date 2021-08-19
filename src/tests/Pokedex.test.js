import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const headH2 = screen.getByRole('heading',
      { name: /Encountered pokémons/i });
    expect(headH2).toBeInTheDocument();
  });

  test('Se é exibido o próx Pokémon da lista quando o bt Próx pokémon é clicado', () => {
    const buttonNext = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
    fireEvent.click(buttonNext);
    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();
  });

  test('Se é exibido o 1o Pokémon se estiver no último Pokémon da lista', () => {
    const buttonNext = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
    const position = 8;
    for (let index = 0; index < position; index += 1) {
      fireEvent.click(buttonNext);
    }
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Se é mostrado apenas um Pokémon por vez', () => {
    const onceIt = screen.getAllByTestId('pokemon-name');
    expect(onceIt.length).toBe(1);
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    const Allbtn = screen.getByRole('button', { name: /All/i });
    expect(Allbtn).toBeInTheDocument();
    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    expect(typeBtn[7].innerHTML).toBe('Dragon');
    const btnFilter = 7;
    expect(typeBtn.length).toBe(btnFilter);
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    const Allbtn = screen.getByRole('button', { name: /All/i });
    expect(Allbtn).toBeInTheDocument();
    fireEvent.click(Allbtn);
    const onePositionPokemon = screen.getByText(/Pikachu/i);
    expect(onePositionPokemon).toBeInTheDocument();
  });
});
