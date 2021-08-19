import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

const pokemonName = 'pokemon-name';
const pokemonTypeButton = 'pokemon-type-button';
const pokemonType = 'pokemon-type';

// Teste o componente <Pokedex.js />
describe('Test Pokedex Component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  // Teste se página contém um heading h2 com o texto Encountered pokémons
  test('should have a h2 whit text', () => {
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });
  // Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.
  test('After click "Próximo pokémon" it list the next pokemon', () => {
    // O botão deve conter o texto Próximo pokémon
    const buttonNext = screen.getByText(/Próximo pokémon/i);
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(buttonNext);
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Charmander/i);
    userEvent.click(buttonNext);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Caterpie/i);
    userEvent.click(buttonNext);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Ekans/i);
    const rest = 5;
    for (let index = 0; index <= rest; index += 1) {
      userEvent.click(buttonNext);
    }
    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Pikachu/i);
  });
  test('if only show a single pokemon', () => {
    // Teste se é mostrado apenas um Pokémon por vez.
    expect(screen.getAllByTestId(pokemonName).length).toBe(1);
  });
  // Teste se a Pokédex tem os botões de filtro.
  test('if there is a fliter button', () => {
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    expect(screen.getAllByTestId(pokemonTypeButton)[0]).toHaveTextContent(/Electric/i);
    expect(screen.getAllByTestId(pokemonTypeButton)[1]).toHaveTextContent(/Fire/i);
    expect(screen.getAllByTestId(pokemonTypeButton)[2]).toHaveTextContent(/Bug/i);
    expect(screen.getAllByTestId(pokemonTypeButton)[3]).toHaveTextContent(/Poison/i);
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    userEvent.click(screen.getAllByTestId(pokemonTypeButton)[0]);
    expect(screen.getByText(/all/i));
    // O texto do botão deve corresponder ao nome do tipo, ex. Electric
    expect(screen.getByTestId(pokemonType)).toHaveTextContent(/Electric/i);
    userEvent.click(screen.getAllByTestId(pokemonTypeButton)[1]);
    // O botão All precisa estar sempre visível.
    expect(screen.getByText(/all/i));
    expect(screen.getByTestId(pokemonType)).toHaveTextContent(/Fire/i);
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByText(/all/i));
    expect(screen.getByTestId(pokemonType)).toHaveTextContent(/Fire/i);
  });
  // Teste se a Pokédex contém um botão para resetar o filtro
  test('if here is a All button and works', () => {
    // O texto do botão deve ser All;
    // Ao carregar a página, o filtro selecionado deverá ser All;
    const buttonALl = screen.getByText(/all/i);
    const nextButton = screen.getByText(/Próximo pokémon/i);
    expect(buttonALl).toBeInTheDocument();
    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
    userEvent.click(buttonALl);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/pikachu/i);
    userEvent.click(nextButton);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Charmander/i);
    userEvent.click(nextButton);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Caterpie/i);
  });
});
