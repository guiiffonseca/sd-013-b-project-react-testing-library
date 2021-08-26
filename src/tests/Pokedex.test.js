import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utilities/renderWithRouter';
import App from '../App';

describe('Teste o componente Pokedex', () => {
  test('Teste se página possui um heading h2 com texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading',
      { name: 'Encountered pokémons', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    // O primeiro Pokemon é o Pikachu
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    // Evento Click no Botão;
    // O botão deve conter o texto 'Próximo pokémon';
    const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    // O próximo pokemon é o Charmander
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    userEvent.click(nextPokemon);
    // O próximo pokemon é o Caterpie
    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    const typesPokemon = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon'];
    expect(buttonFilter.length).toBe(typesPokemon.length);
    buttonFilter.forEach((button, index) => (
      expect(button).toHaveTextContent(typesPokemon[index])));
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonReset = screen.getByRole('button', { name: 'All' });
    expect(buttonReset).toBeInTheDocument();
  });
});
